import express, { Router } from "express";
import { CreateCheckoutSessionController } from "../../../../modules/checkout/useCases/createCheckoutSession/CreateCheckoutSessionController";
import { ProcessWebhookController } from "../../../../modules/checkout/useCases/processWebhook/ProcessWebhookController";

const checkoutRoute = Router()

const createCheckoutSessionController = new CreateCheckoutSessionController()
checkoutRoute.post('/checkout/:userId', createCheckoutSessionController.handle)

const stripeRoute = Router()

const processWebhookController = new ProcessWebhookController()
stripeRoute.post('/webhook', express.raw({ type: 'application/json' }), processWebhookController.handle)

export { checkoutRoute, stripeRoute }