import { v4 as uuidV4 } from 'uuid'

class Truck {
  id?: string
  brandId: number // id of brand from FIPE api
  modelId: number // id of model from FIPE api
  plate: string
  typeId: number
  renavam: number
  manufactureYear: number
  modelYear: number
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}

export { Truck }