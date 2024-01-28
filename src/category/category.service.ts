import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schema/category.schema';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categorySchema: Model<Category>
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const { text } = createCategoryDto;
    const categoryExists = await this.categorySchema.findOne({ text });
    if (categoryExists) {
      return { message: 'This category already exists.' };
    }
    await this.categorySchema.create({ text });
    return { message: 'Category added!' };
  }

  async update(id: string, createCategoryDto: CreateCategoryDto) {
    const { text } = createCategoryDto;
    const cId = new ObjectId(id);
    const categoryExists = await this.categorySchema.findById(cId);
    if (!categoryExists) {
      return { error: 'Category with this id does not exist!' };
    }
    await this.categorySchema.findByIdAndUpdate(cId, { text });
    return { message: 'updated!' };
  }

  async remove(id: string) {
    const ctgryId = new ObjectId(id);
    const category = await this.categorySchema.findById(ctgryId);
    if(!category){
      return {message: "category does not exist!"}
    }
    await this.categorySchema.findByIdAndDelete(ctgryId);
    return {message: "deleted"}
  }
}
