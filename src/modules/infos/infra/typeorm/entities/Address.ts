import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { Exclude } from 'class-transformer'
import { Customer } from '../../../../customers/infra/typeorm/entities/Customer'
import { Driver } from '../../../../drivers/infra/typeorm/entities/Driver'

@Entity('adresses')
class Address {
  @PrimaryColumn()
  id: string

  @Column()
  CEP: string

  @Column()
  street: string

  @Column()
  number: number

  @Column()
  neighborhood: string

  @Column()
  state: string

  @Column()
  city: string

  @Column()
  complement?: string

  @Column()
  lat?: number

  @Column()
  lng?: number

  @ManyToOne(() => Customer, (customer) => customer.adresses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "customer_id" })
  customer: Customer

  @Column()
  @Exclude()
  customer_id: string

  @ManyToOne(() => Driver, (driver) => driver.address, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "driver_id" })
  driver: Driver

  @Column()
  @Exclude()
  driver_id: string

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuidv4()
    }
  }
}

export { Address }