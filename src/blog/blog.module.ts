import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { blogSchema } from './schema/blog.schema';
import { CreateBlogDto } from './dto/create-blog.dto';

@Module({
  imports: [AuthModule, MongooseModule.forFeature([{name: "Blog", schema: blogSchema}])],
  controllers: [BlogController],
  providers: [CreateBlogDto, BlogService],
  exports:[BlogModule]
})
export class BlogModule {}
