import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

import stripe from './stripe-client';
import { STRIPE_API_VERSION, STRIPE_WEBHOOK_ENDPOINT_SECRET } from './utils/constants';

/**
 * The StripeService class to be used by other services instead of directly accessing the Stripe SDK.
 * This StripeModule can be treated as a separate package or SDK wrapper to ensure consistency and ease of reuse.
 */
@Injectable()
export class StripeService {
  #stripe: Stripe;

  constructor() {
    this.#stripe = stripe;
  }

  // -------------------- Customer Methods --------------------- //
  async createCustomer(customerParams: Stripe.CustomerCreateParams) {
    const customer = await this.#stripe.customers.create(customerParams);
    return customer;
  }

  async createEphemeralKey(
    params: Stripe.EphemeralKeyCreateParams,
  ): Promise<string> {
    const key = await this.#stripe.ephemeralKeys.create(params, {
      apiVersion: STRIPE_API_VERSION,
    });

    const { secret } = key;
    return secret;
  }

  // ---------------- Setup Intent Methods ---------------- //
  async createSetupIntent(
    customerId: string,
    confirm: boolean,
    returnUrl?: string,
  ): Promise<Stripe.SetupIntent> {
    const setupIntent = await this.#stripe.setupIntents.create({
      customer: customerId,
      confirm,
      return_url: returnUrl,
    });

    return setupIntent;
  }

  async getSetupIntent(referenceId: string): Promise<Stripe.SetupIntent> {
    const setupIntent = await this.#stripe.setupIntents.retrieve(referenceId);
    return setupIntent;
  }

  // --------------- Payment Intent Methods -------------- //
  async createPaymentIntent(
    customer: string,
    amount: number,
    currency?: string,
    metadata?: Stripe.MetadataParam,
  ): Promise<Stripe.PaymentIntent> {
    const paymentIntent = await this.#stripe.paymentIntents.create({
      customer,
      amount,
      currency,
      capture_method: 'manual',
      metadata,
    });

    return paymentIntent;
  }

  async capturePaymentIntent(
    paymentIntentId: string,
    amountToCapture?: number,
    metadata?: Stripe.MetadataParam,
  ): Promise<Stripe.PaymentIntent> {
    const intent = await this.#stripe.paymentIntents.capture(
      paymentIntentId,
      {
        amount_to_capture: amountToCapture,
        metadata,
      },
    );

    return intent;
  }

  async cancelPaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
    const paymentIntent = await this.#stripe.paymentIntents.cancel(paymentIntentId);
    return paymentIntent;
  }

  async getPaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
    const paymentIntent = await this.#stripe.paymentIntents.retrieve(paymentIntentId);
    return paymentIntent;
  }

  // ------------------------ Webhook Methods ---------------------- //
  constructWebhookEvent(payload: string | Buffer, signature: string) {
    const event = this.#stripe.webhooks.constructEvent(
      payload,
      signature,
      STRIPE_WEBHOOK_ENDPOINT_SECRET,
    );

    return event;
  }
}
