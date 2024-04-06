import { inject, injectable } from "tsyringe";
import { stripe } from "../../../../config/stripe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";

@injectable()
class CreateCheckoutSessionUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) { }

  async execute(userId: string) {
    if (!userId) {
      throw new AppError('User id is missing')
    }

    let user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new AppError('User not found')
    }

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'subscription',
        client_reference_id: user.id,
        customer: user.stripe_customer_id,
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
        line_items: [{
          price: process.env.STRIPE_PRO_PRICE_ID,
          quantity: 1
        }]
      })

      return {
        url: session.url,
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export { CreateCheckoutSessionUseCase }