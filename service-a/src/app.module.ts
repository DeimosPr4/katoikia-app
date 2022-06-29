import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [ 
    MongooseModule.forRoot(`mongodb+srv://proyecto_4:proyecto_4@proyecto4.yv4fb.mongodb.net/servicio_books?retryWrites=true&w=majority`),
    BooksModule, 
    UsersModule, 
    CategoriesModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
