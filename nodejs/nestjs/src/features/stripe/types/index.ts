import Stripe from 'stripe';

export type StripeEvent = Stripe.Event;
export type StripePaymentIntent = Stripe.PaymentIntent;
export type StripePaymentIntentStatus = Stripe.PaymentIntent.Status;
export type StripePaymentMethod = Stripe.PaymentMethod;
export type StripeMetaData = Stripe.MetadataParam;
