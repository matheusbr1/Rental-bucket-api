type contactType = 'phone' | 'cellphone' | 'email'

interface ICreateContactDTO {
  id?: string // If filled, the register will be updated
  contact: string
  contact_type: contactType
  customer_id?: string
  driver_id?: string
}

export { ICreateContactDTO }