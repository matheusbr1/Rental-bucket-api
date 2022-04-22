import { v4 as uuidV4 } from 'uuid'

class Customer {
  id?: string
  
  personType: 'F' | 'J' // Pessoa Física ou Jurídica
  
  CPF_CNPJ?: number

  name?: string
  
  address: {
    CEP: string
    street: string
    number: number
    neighborhood: string
    state: string
    city: string
    complement?: string
  }

  contact: {
    phone: string
    cellphone: string
    email: string
  }

  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}

export { Customer }