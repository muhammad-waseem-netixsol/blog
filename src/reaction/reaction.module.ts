import { Module } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { ReactionController } from './reaction.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { reactionSchema } from './schema/reaction.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule, MongooseModule.forFeature([{name: "Reaction", schema: reactionSchema}])],
  controllers: [ReactionController],
  providers: [ReactionService],
})
export class ReactionModule {}
