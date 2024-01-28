import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { User } from "src/auth/schema/user.schema";
export enum postStatus {
    PENDING= "pending",
    APPROVED="approved",
    REJECTED="rejected"
}
@Schema({timestamps: true})
export class Blog extends Document{
    @Prop()
    heading: string

    @Prop()
    text: string 

    @Prop({default: "pending"})
    status: postStatus

    @Prop({type: mongoose.Types.ObjectId, ref: "User"})
    user: User

}

export const blogSchema = SchemaFactory.createForClass(Blog);

