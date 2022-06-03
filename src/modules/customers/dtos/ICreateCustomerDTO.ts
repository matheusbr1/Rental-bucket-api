// Data Transfer Object -> DTO
export interface ICreateCustomerDTO {
  person_type: 'F' | 'J'  // Pessoa Física ou Jurídica
  CPF_CNPJ?: number
  name?: string
  company_name?: string
  fantasy_name?: string 
}