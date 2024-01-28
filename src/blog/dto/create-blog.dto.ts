import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"
import { postStatus } from "../schema/blog.schema"

export class CreateBlogDto {
    @IsNotEmpty({message:"Heading can not be empty"})
    @IsString({message: "Heading must be valid string"})
    heading: string

    @IsNotEmpty({message:"Text body can not be empty"})
    @IsString({message: "Heading must be valid string"})
    @MaxLength(1000)
    @MinLength(10)
    text: string 

    @IsNotEmpty({message: "Post status is missing"})
    @IsEnum(postStatus)
    status: postStatus

      // category: string
    // reaction: string
    // comment: string
}
