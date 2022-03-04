import { v4 as uuidV4 } from 'uuid'

class Work {
  id?: string
  customer_CPF_CNPJ: number
  driver_CPF: number
  truck: string
  equipment: string
  quantity: number
  type: string
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}

export { Work }