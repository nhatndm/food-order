import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class SchemaValidationPipes implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException('No data summited');
    }

    const { metatype } = metadata;

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      throw new HttpException(
        {
          message: 'Input data validation failed',
          errors: this.buildError(errors),
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return value;
  }

  private buildError(errors) {
    const result = {};
    errors.forEach(el => {
      let prop = el.property;
      Object.entries(el.constraints).forEach(constraint => {
        result[prop + constraint[0]] = `${constraint[1]}`;
      });
    });
    return result;
  }
}
