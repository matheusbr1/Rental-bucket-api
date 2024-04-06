import Stripe from "stripe";

// stripe listen --forward-to localhost:3333/webhook

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
})

export const getStripeCustomerByEmail = async (email: string) => {
  const custumers = await stripe.customers.list({ email });
  return custumers.data[0];
};

export const createStripeCustomer = async (data: {
  email: string;
  name?: string;
}) => {
  const custumer = await getStripeCustomerByEmail(data?.email);
  if (custumer) return custumer;

  return stripe.customers.create({
    email: data.email,
    name: data.name,
  });
};
