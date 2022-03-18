import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { JwtRequest } from '../interfaces/request';

@Injectable()
export class JwtValidationGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: JwtRequest = context.switchToHttp().getRequest();

    const tokenWithBearerString: string = request.headers.authorization;
    if (tokenWithBearerString === '' || !tokenWithBearerString)
      throw new UnauthorizedException('인증에 필요한 토큰이 없어요. ☹️');
    const token = tokenWithBearerString.split('Bearer')[1].trim();

    try {
      const decodeToken: any = jwt.verify(token, process.env.JWT_SECRET);
      console.debug(decodeToken);
      if (decodeToken.sub !== 'act') {
        if (decodeToken.sub === 'rft' && request.url === '/users/refresh') {
          const uid = decodeToken.uid;
          request.uid = uid;
          return true;
        }
        throw new UnauthorizedException('비정상적인 토큰이에요. ☹️');
      }
      if (!decodeToken.uid) {
        throw new UnauthorizedException('비정상적인 토큰이에요. ☹️');
      }
      const uid = decodeToken.uid;
      request.uid = uid;
      return true;
    } catch (error) {
      throw new UnauthorizedException('유효하지않은 토큰이에요. ☹️');
    }
  }
}
