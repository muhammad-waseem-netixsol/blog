import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';



export class UpdateCommentDto extends PartialType(CreateCommentDto) {
    @IsString({message: "Comment must be a string.."})
    @IsNotEmpty({message: "comment is required"})
    @MinLength(1)
    @MaxLength(100)
    comment:string 

    @IsNotEmpty()
    blog: string
}
