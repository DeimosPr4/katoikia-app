import { Req } from '@nestjs/common';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookDocument } from './schemas/book.schema';

@Controller('books')
@ApiTags('book')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() book: BookDocument) {
    return this.booksService.create(book);
  }

  @Get()
  findAll(@Req() request: Request) {
    return this.booksService.findAll(request);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() book: BookDocument) {
    return this.booksService.update(id, book);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
