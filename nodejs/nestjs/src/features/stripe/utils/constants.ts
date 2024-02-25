export const STRIPE_API_KEY = process.env.STRIPE_API_KEY;
export const STRIPE_WEBHOOK_ENDPOINT_SECRET = process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET;
export const STRIPE_API_VERSION = '2020-08-27'; // API version as per Stripe dashboard
export const STRIPE_PAYMENT_SUCCESS_EVENT_NAME = 'payment_intent.succeeded';
export const STRIPE_PAYMENT_FAILURE_EVENT_NAME =
  'payment_intent.payment_failed';
export const STRIPE_PAYMENT_CAPTURE_EVENT_NAME =
  'payment_intent.amount_capturable_updated';
export const STRIPE_PAYMENT_CANCELLED_EVENT_NAME = 'payment_intent.canceled';
