import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
import { AppError } from "../../../../shared/errors/AppError";
import Stripe from "stripe";

@injectable()
class ProcessWebhookUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) { }

  async handleProcessWebhookCheckoutSessionCompleted(event: {
    data: { object: Stripe.Checkout.Session }
  }) {
    try {
      const clientReferenceId = event.data.object.client_reference_id as string
      const stripeSubscriptionId = event.data.object.subscription as string
      const stripeCustomerId = event.data.object.customer as string
      const checkoutStatus = event.data.object.status

      console.log('[Stripe] processing checkout')
      console.log(`[Stripe] checkout-status ${checkoutStatus}`)

      if (checkoutStatus !== 'complete') return

      if (!clientReferenceId || !stripeSubscriptionId || !stripeCustomerId) {
        throw new AppError('clientReferenceId, stripeSubscriptionId and stripeCustomerId is required')
      }

      const user = await this.usersRepository.findById(clientReferenceId)
      if (!user) {
        throw new AppError('user of clientReferenceId not found')
      }

      await this.usersRepository.create({
        ...user,
        stripe_customer_id: stripeCustomerId,
        stripe_subscription_id: stripeSubscriptionId
      })

      console.log('[Stripe] checkout finished')
    } catch (error) {
      console.log(`[Stripe] ${error}`)
    }
  }

  async handleProcessWebhookSubscriptionUpdated(event: {
    data: { object: Stripe.Subscription }
  }) {
    try {
      const stripeCustomerId = event.data.object.customer as string
      const stripeSubscriptionId = event.data.object.id as string
      const stripeSubscriptionStatus = event.data.object.status

      console.log('[Stripe] processing subscription update')

      if (!stripeSubscriptionId || !stripeCustomerId) {
        throw new AppError('stripeSubscriptionId and stripeCustomerId is required')
      }

      const user = await this.usersRepository.findByStripeCustomerId(stripeCustomerId)
      if (!user) {
        throw new AppError('user of stripeCustomerId not found')
      }

      console.log(`[Stripe] inserting into user`)

      await this.usersRepository.create({
        ...user,
        stripe_customer_id: stripeCustomerId,
        stripe_subscription_id: stripeSubscriptionId,
        stripe_subscription_status: stripeSubscriptionStatus
      })

      console.log('[Stripe] subscription update finished')
    } catch (error) {
      console.log(`[Stripe] ${error}`)
    }
  }

  async execute(event: Stripe.Event) {
    switch (event.type) {
      case 'checkout.session.completed':
        console.log(`[Stripe] event-type: ${event.type}`)
        this.handleProcessWebhookCheckoutSessionCompleted(event)
        break;
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        console.log(`[Stripe] event-type: ${event.type}`)
        this.handleProcessWebhookSubscriptionUpdated(event)
        break;
      default:
        console.log(`[Stripe] Unhandled event type ${event.type}`);
    }
  }
}

export { ProcessWebhookUseCase }