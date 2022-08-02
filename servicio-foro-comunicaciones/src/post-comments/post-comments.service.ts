import { Injectable } from '@nestjs/common';
import { Comment, CommentDocument } from '../schemas/post-comment.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PostCommentsService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
  ) {}

  async create(comment: CommentDocument): Promise<Comment> {
    return this.commentModel.create(comment);
  }

  async findAll(): Promise<Comment[]> {
    return this.commentModel.find().setOptions({ sanitizeFilter: true }).exec();
  }

  async findOne(id: string): Promise<Comment> {
    return this.commentModel.findOne({ _id: id }).exec();
  }

  async findOneByDNI(dni: string): Promise<Comment> {
    return this.commentModel.findOne({ dni: dni }).exec();
  }

  async update(id: string, comment: CommentDocument) {
    return this.commentModel.findOneAndUpdate({ _id: id }, comment, {
      new: true,
    });
  }

  async remove(id: string) {
    return this.commentModel.findOneAndUpdate({ _id: id }, {status: '-1'}, {
      new: true,
    });  
  }
}
