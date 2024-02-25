import { Global, Module } from '@nestjs/common';

import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';

@Global()
@Module({
  exports: [StripeService],
  providers: [StripeService],
  controllers: [StripeController],
})
export class StripeModule {}
