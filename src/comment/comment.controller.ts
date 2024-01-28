import { Controller, Post, Body, Req, Delete, UseGuards, Param, Put } from '@nestjs/common';
import { CommentService } from './commment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService,) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createCommentDto: CreateCommentDto,  @Req() req:any) {
    return this.commentService.create(createCommentDto, req);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  updateComment(@Param('id') id: string,@Body() createCommentDto: CreateCommentDto,  @Req() req:any) {
    console.log("params id =>", id)
    return this.commentService.update(id,createCommentDto, req);
  }


  @Delete(':id')
  @UseGuards(AuthGuard())
  removeComment(@Param() id:string, @Req() req:any) {
    return this.commentService.remove(id, req);
  }  



 

}
