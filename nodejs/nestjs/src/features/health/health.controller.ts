import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Redirect,
} from '@nestjs/common';

import { Public } from '../../utils/constants';

@Controller('')
export class HealthController {
  @Public()
  @Redirect('/health', HttpStatus.FOUND)
  @Get()
  redirect() {
    return;
  }

  @HttpCode(HttpStatus.OK)
  @Get('health')
  echo(): string {
    return 'Hello World!';
  }
}
