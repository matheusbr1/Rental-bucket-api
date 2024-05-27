import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'
import { Contact } from '../../../../_contact/infra/typeorm/entities/Contact'
import { Address } from '../../../../_address/infra/typeorm/entities/Address'


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
  adresses: Address[]

  @Column()
  company_name?: string

  @Column()
  fantasy_name?: string

  @Column()
  company_id: string

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}

export { Customer }