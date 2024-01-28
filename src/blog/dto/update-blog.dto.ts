import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"


export class UpdateBlogDto {

    @IsNotEmpty({message:"Heading can not be empty"})
    @IsString({message: "Heading must be valid string"})
    heading: string

    @IsNotEmpty({message:"Text body can not be empty"})
    @IsString({message: "Heading must be valid string"})
    @MaxLength(1000)
    @MinLength(10)
    text: string 

}
