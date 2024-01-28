import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
// import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './schema/comment.schema';
import { Blog } from 'src/blog/schema/blog.schema';
import { ObjectId } from 'mongodb';

@Injectable()
export class CommentService {
  constructor(@InjectModel(Comment.name) private commentSchema: Model<Comment>,@InjectModel(Blog.name) private blogSchema: Model<Blog>){

  }
  async create(createCommentDto:CreateCommentDto, req:any) {
    const {comment, blog} = createCommentDto;
    console.log(blog)
    const blogExists = await this.blogSchema.findOne({_id: blog});
    if(!blogExists){
      return {message : "Blog with this id does not exists!"};
    }
   const commentIns = new this.commentSchema();
   commentIns.user = req.user._id;
   commentIns.blog = blogExists._id;
   commentIns.comment = comment;
   return await commentIns.save();
  }

  async remove(id: string, req:any) {
    const commentId= new ObjectId(id);
    const commentExists = await this.commentSchema.findOne({user: req.user._id, _id: commentId})
    if(!commentExists){
      return {message: "Comment does not exist!"};
    }
    await this.commentSchema.deleteOne({user: req.user._id, _id: commentId})
    return {type: "success", operation: "Comment deleted!"}
  }

  async update(id: string, createCommentDto: CreateCommentDto, req: any) {
    try {
      const { blog, comment } = createCommentDto;
      const cId = new ObjectId(id);
      const userId = req?.user?._id;
      const blogId = new ObjectId(blog)
      console.log("blog id => ", blog);
      console.log("comment id => ", id)
      console.log("user id => ", req?.user?._id)
      const commentExists = await this.commentSchema.findOne({ _id:cId, user: userId, blog: blogId  });
  
      console.log(commentExists);
  
      if (!commentExists) {
        return { message: "Comment not found!" };
      }
  
      await this.commentSchema.findByIdAndUpdate(id, { comment });
      return { message: "Comment updated!" };
    } catch (err) {
      return err;
    }
  }
  

  
}
