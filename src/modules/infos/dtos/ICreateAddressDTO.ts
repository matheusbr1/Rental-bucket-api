interface ICreateAddressDTO {
  id?: string // If filled, the register will be updated
  CEP: string
  street: string
  number: number
  neighborhood: string
  state: string
  city: string
  complement?: string
  customer_id?: string
  driver_id?: string
}

export { ICreateAddressDTO }