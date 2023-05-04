import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { BookDto } from '../dto/book.dto';

@Injectable()
export class Bookpipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): BookDto {
    if (value.role === 'admin') {
      return value;
    } else {
      throw new BadRequestException('Only admins can access this resource');
    }
  }
}
