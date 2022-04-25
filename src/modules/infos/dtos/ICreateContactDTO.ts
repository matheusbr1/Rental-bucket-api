type contactType = 'phone' | 'cellphone' | 'email'

interface ICreateContactDTO {
  contact: string
  contact_type: contactType
  customer_id?: string
  driver_id?: string
}

export { ICreateContactDTO }