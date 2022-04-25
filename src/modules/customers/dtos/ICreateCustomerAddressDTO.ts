interface ICreateCustomerAddressDTO {
  CEP: string
  street: string
  number: number
  neighborhood: string
  state: string
  city: string
  complement?: string
  customer_id: string
}

export { ICreateCustomerAddressDTO }