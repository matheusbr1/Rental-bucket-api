interface ICreateAddressDTO {
  /**
   * if filled the register will be updated
   */
  updated_at?: Date
  id?: string
  CEP: string
  street: string
  number: number
  neighborhood: string
  state: string
  city: string
  complement?: string
  customer_id?: string
  driver_id?: string

  /**
   * is used only on create address use case execution
   */
  lat?: number
  lng?: number
}

export { ICreateAddressDTO }