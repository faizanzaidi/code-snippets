import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import {  IS_PUBLIC_KEY } from 'src/utils/constants';

/**
 * Guards are a good way of implenting authentication and authorization checks
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private async validateRequest(token: string | undefined, request: Request) {
    if (!token) {
      throw new UnauthorizedException('User authorization is missing');
    }

    // If token is present and assuming it is valid, the request can be updated with JWT payload for Controller to access
    request['some_user_property'] = 'This user is authenticated';
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);


    // If API is annotated Public() do not check for authentication
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    await this.validateRequest(token, request);

    return true;
  }
}
