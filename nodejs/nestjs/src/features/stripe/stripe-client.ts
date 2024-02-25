import Stripe from 'stripe';

import { STRIPE_API_KEY } from './utils/constants';

const stripe = new Stripe(STRIPE_API_KEY, {
  apiVersion: null,
  typescript: true,
});

export default stripe;
