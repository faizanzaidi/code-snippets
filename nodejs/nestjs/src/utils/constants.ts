import { SetMetadata } from '@nestjs/common';

export const LOCALHOST_ORIGIN_CORS: string | RegExp = /localhost/;
export const WHITELISTED_ORIGINS_CORS: (string | RegExp)[] = [
  process.env.WEB_DOMAIN,
  LOCALHOST_ORIGIN_CORS,
];
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
