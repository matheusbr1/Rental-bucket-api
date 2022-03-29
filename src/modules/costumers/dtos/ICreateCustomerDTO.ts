// Data Transfer Object -> DTO
export interface ICreateCustomerDTO {
  // Pessoa Física ou Jurídica
  personType: 'F' | 'J' 
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
}