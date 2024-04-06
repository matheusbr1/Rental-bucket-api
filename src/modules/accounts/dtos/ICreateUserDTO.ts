export interface ICreateUserDTO {
  id?: string
  company_id: string
  name: string
  email: string
  password: string
  avatar?: string

  stripe_customer_id?: string
  stripe_subscription_id?: string
  stripe_subscription_status?: string
}