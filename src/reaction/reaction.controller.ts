import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('reaction')
export class ReactionController {
  constructor(private readonly reactionService: ReactionService) {}

  @Post()
  @UseGuards(AuthGuard())
  handleReaction(@Body() createReactionDto: CreateReactionDto, @Req() req:any) {
    return this.reactionService.reactionController(createReactionDto, req);
  }
}
