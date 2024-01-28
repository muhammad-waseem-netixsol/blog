import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from './schema/blog.schema';
import { Model } from 'mongoose';
import { User } from 'src/auth/schema/user.schema';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogSchema: Model<Blog>) {}
  // creates a new blog
  async create(createBlogDto: CreateBlogDto, user: User) {
   
    const { heading, status, text } = createBlogDto;
    const blog = new this.blogSchema();
    blog.heading = heading;
    blog.status = status;
    blog.text = text;
    blog.user = user._id;
    const newBlog = await blog.save();
    return newBlog;

  }
  // it simply returns all blog
  async findAll() {
    return await this.blogSchema.find();
  }
  // returns a blog using id
  async findOne(id: string) {
    console.log(id);
    return await this.blogSchema.findById(id);
  }
  // updates a blog
  async update(id: string, updateBlogDto: UpdateBlogDto, user: User) {
    const blogExists = await this.blogSchema.findOne({_id:id, user: user._id});
    if (!blogExists) {
      return { error: 'Invalid blog id has been sent or this was not created by you!' };
    }
    const { text, heading } = updateBlogDto;
    await this.blogSchema.findByIdAndUpdate(id, {
      text,
      heading,
    });
    return { message: 'Blog has been updated!' };
  }
  // deletes a blog 
  async remove(id: string) {
    await this.blogSchema.findByIdAndDelete(id);
    return { message: `blog with with ${id} has been deleted!` };
  }
}
