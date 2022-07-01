import { Injectable } from '@nestjs/common';
import { Post, PostDocument } from '../schemas/post.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) { }

  async create(post: PostDocument): Promise<Post> {
    return this.postModel.create(post);
  }

  async findAll(): Promise<Post[]> { 
    return this.postModel
      .find() 
      .setOptions({ sanitizeFilter: true }) 
      .exec();
  }
  
  async findOne(id: string): Promise<Post> {
    return this.postModel.findOne({ _id: id }).exec();
  }

  async update(id: string, post: PostDocument) {
    return this.postModel.findOneAndUpdate({ _id: id }, post, {
      new: true,
    });
  }

  async remove(id: string) {
    return this.postModel.findByIdAndRemove({ _id: id }).exec();
  }
}
