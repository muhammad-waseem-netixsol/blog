import { IsEnum, IsNotEmpty } from "class-validator";
import { ReactionType } from "../schema/reaction.schema";
import { Blog } from "src/blog/schema/blog.schema";

export class CreateReactionDto {
    @IsNotEmpty()
    @IsEnum(ReactionType) 
    reaction: ReactionType

    @IsNotEmpty()
    blog: string
}
