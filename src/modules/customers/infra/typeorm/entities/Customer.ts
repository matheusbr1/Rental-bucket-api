import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'
import { Address } from './Address'
import { Contact } from './Contact'

@Entity('customers')
class Customer {
  @PrimaryColumn()
  id?: string
  
  @Column()
  person_type: 'F' | 'J' // Pessoa Física ou Jurídica
  
  @Column()
  CPF_CNPJ?: number

  @Column()
  name?: string

  @OneToMany(() => Contact, (contact) => contact.customer)
  contacts: Contact[]

  @OneToMany(() => Address, (address) => address.customer)
  adresses: Contact[]

  @Column()
  company_name?: string

  @Column()
  fantasy_name?: string

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}

export { Customer }