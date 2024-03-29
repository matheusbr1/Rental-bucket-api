
export interface ICreateTruckDTO {
  brand_id: string // id of brand from FIPE api
  model_id: string // id of model from FIPE api
  plate: string
  truck_type_id: string
  renavam: number
  manufacture_year: number
  model_year: number
  company_id: string
}
