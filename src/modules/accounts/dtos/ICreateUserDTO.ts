export interface ICreateUserDTO {
  id?: string
  company_id: string
  name: string
  email: string
  password: string
  avatar?: string
}