import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post("/create-blog")
  @UseGuards(AuthGuard())
  create(@Body() createBlogDto: CreateBlogDto, @Req() req:any) {
    return this.blogService.create(createBlogDto, req.user);
  }

  @Get("/get-blogs")
  findAllBlogs() {
    return this.blogService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  findOneBlog(@Param('id') id: string) {
    return this.blogService.findOne(id);
  }

  @Patch('/update/:id')
  @UseGuards(AuthGuard())
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto, @Req() req:any) {
    return this.blogService.update(id, updateBlogDto, req);
  }

  @Delete('/delete/:id')
  @UseGuards(AuthGuard())
  removeBlog(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}
