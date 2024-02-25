import {
  Controller,
  Post,
  Req,
  UseFilters,
  Headers,
  RawBodyRequest,
  BadRequestException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { HttpExceptionFilter } from 'src/middleware/filters';
import { Public } from 'src/utils';
import { StripeService } from './stripe.service';

@ApiTags('Stripe')
@ApiBearerAuth()
@Controller('stripe')
@UseFilters(HttpExceptionFilter)
export class StripeController {
  // Typically, there would be a dedicated payment service between StripeService
  //  and controller e.g. to update database upon receiving a webhook update
  constructor(private readonly stripeService: StripeService) {}

  @Public()
  @Post('webhook')
  stripeWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string,
  ) {
    const { rawBody } = req;

    if (!rawBody) {
      throw new BadRequestException('No webhook payload was provided.');
    }

    const stripeEvent = this.stripeService.constructWebhookEvent(
      rawBody,
      signature,
    );

    const { type, data } = stripeEvent;
    const { object } = data;

    // Do something with the type and object information
  }
}
