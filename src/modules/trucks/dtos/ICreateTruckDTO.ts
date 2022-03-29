
export interface ICreateTruckDTO {
  brandId: number // id of brand from FIPE api
  modelId: number // id of model from FIPE api
  plate: string
  typeId: number 
  renavam: number
  year: {
    manufacture: number
    model: number
  }
}
