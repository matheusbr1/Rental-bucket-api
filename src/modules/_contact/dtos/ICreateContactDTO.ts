interface ICreateContactDTO {
  id?: string // If filled, the register will be updated
  contact: string
  contact_type: 'phone' | 'cellphone' | 'email'
  customer_id?: string
  driver_id?: string
}

export { ICreateContactDTO }