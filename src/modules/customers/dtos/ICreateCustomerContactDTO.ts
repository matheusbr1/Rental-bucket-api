type contactType = 'phone' | 'cellphone' | 'email'

interface ICreateCustomerContactDTO {
  contact: string
  contact_type: contactType
  customer_id: string
}

export { ICreateCustomerContactDTO }