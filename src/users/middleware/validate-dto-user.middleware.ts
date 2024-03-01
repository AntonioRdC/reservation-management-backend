import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ValidateDtoUserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const allowedFields = ['name', 'email', 'password'];
    const invalidFields = Object.keys(req.body).filter(
      (key) => !allowedFields.includes(key),
    );

    if (invalidFields.length > 0) {
      throw new HttpException(
        `Invalid fields: ${invalidFields.join(', ')}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    next();
  }
}
