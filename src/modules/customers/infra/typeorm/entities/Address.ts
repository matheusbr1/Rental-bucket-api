import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { Customer } from './Customer'

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

  @ManyToOne(() => Customer, (customer) => customer.adresses)
  @JoinColumn({ name: "customer_id" })
  customer: Customer
  
  @Column()
  customer_id: string

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuidv4()
    }
  }
}

export { Address }