import { Column, CreateDateColumn, Entity, OneToOne, PrimaryColumn } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'
import { Address } from '../../../../infos/infra/typeorm/entities/Address'

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

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}

export { Company }