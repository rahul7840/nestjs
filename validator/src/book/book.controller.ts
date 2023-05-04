import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { BookDto } from '../dto/book.dto';
import { Bookpipe } from '../pipe/bookpipe.pipe';

@Controller('book')
export class BookController {
  @Get(':id')
  findBookById(@Param('id', ParseIntPipe) id: Number): string {
    console.log(id, typeof id);
    return `Book with id ${id} is seen`;
  }
  @Post('add')
  addBook(@Body(new Bookpipe()) book: BookDto): string {
    return 'book is added';
  }
}
