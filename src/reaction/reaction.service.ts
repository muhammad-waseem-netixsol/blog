import { Injectable } from '@nestjs/common';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Reaction } from './schema/reaction.schema';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

@Injectable()
export class ReactionService {
  constructor(@InjectModel(Reaction.name) private reactionSchema: Model<Reaction>){

  }
  async reactionController(createReactionDto: CreateReactionDto, req: any) {
    try{
      const { blog, reaction } = createReactionDto;
    const bId = new ObjectId(blog);
    const reactionExists = await this.reactionSchema.findOne({blog:bId, user:req?.user?._id})
    if(!reactionExists){
       await this.reactionSchema.create({reaction, blog:bId, user:req?.user?._id} )
       return {message: "created"}
    }
    if(reactionExists.reaction !== reaction){
      await this.reactionSchema.findByIdAndUpdate(reactionExists._id, {reaction})
      return {message: "changed"}
    }
    await this.reactionSchema.findByIdAndDelete(reactionExists._id);
    return {message: "deleted"}
    }catch(err){
      return {error: "Internal server error"}
    }
    
  }
}
