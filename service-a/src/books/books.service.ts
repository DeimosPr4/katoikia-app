import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { Model } from 'mongoose';
import { Request } from 'express';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
  ) {}

  async create(book: BookDocument): Promise<Book> {
    return this.bookModel.create(book);
  }

  async findAll(request: Request): Promise<Book[]> {
    return this.bookModel
      .find(request.query)
      .setOptions({ sanitizeFilter: true })
      .exec();
  }

  async findOne(id: string): Promise<Book> {
    return this.bookModel.findOne({ _id: id }).exec();
  }

  async update(id: string, book: BookDocument) {
    return this.bookModel.findOneAndUpdate({ _id: id }, book, {
      new: true,
    });
  }

  async remove(id: string) {
    return this.bookModel.findByIdAndRemove({ _id: id }).exec();
  }
}
