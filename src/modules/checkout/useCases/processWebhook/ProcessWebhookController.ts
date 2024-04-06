import { Request, Response } from "express";
import { ProcessWebhookUseCase } from "./ProcessWebhookUseCase";
import { container } from "tsyringe";
import { stripe } from "../../../../config/stripe";
import Stripe from "stripe";

class ProcessWebhookController {
  async handle(request: Request, response: Response): Promise<Response> {
    let event: Stripe.Event = request.body

    const signature = request.headers['stripe-signature'];

    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET_KEY,
      );

      const types = [
        'checkout.session.completed',
        'customer.subscription.created',
        'customer.subscription.updated'
      ]

      if (types.includes(event.type)) {
        console.log('event', event)
      }

      const processWebhookUseCase = container.resolve(ProcessWebhookUseCase)
      await processWebhookUseCase.execute(event)
    } catch (err) {
      console.error(`Webhook Error: ${err.message}`)
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    return response.json({ received: true })
  }
}

export { ProcessWebhookController }