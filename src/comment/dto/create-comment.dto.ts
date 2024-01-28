import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { User } from "src/auth/schema/user.schema";

export class CreateCommentDto {

    @IsString({message: "Comment must be a string.."})
    @IsNotEmpty({message: "comment is required"})
    @MinLength(1)
    @MaxLength(100)
    comment:string 

    @IsOptional()
    user: User
    
    @IsNotEmpty()
    blog: string
}
