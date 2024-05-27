import { Column, CreateDateColumn, Entity, OneToOne, PrimaryColumn } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'
import { Address } from '../../../../_address/infra/typeorm/entities/Address'

@Entity('companies')
class Company {
  @PrimaryColumn()
  id?: string

  @Column()
  name: string

  @OneToOne(() => Address, (address => address.company))
  address: Address

  @CreateDateColumn()
  created_at: Date

  @Column()
  hasSubscription: boolean

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}

export { Company }