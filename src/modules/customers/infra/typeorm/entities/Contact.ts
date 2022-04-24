import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { Customer } from './Customer'

@Entity('contacts')
class Contact {
  @PrimaryColumn()
  id: string

  @Column()
  contact: string

  @Column()
  contact_type: string

  @ManyToOne(() => Customer, (customer) => customer.contacts)
  @JoinColumn({ name: "customer_id" })
  customer: Customer

  @Column()
  customer_id: string
  
  @Column()
  driver_id: string

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuidv4()
    }
  }
}

export { Contact }