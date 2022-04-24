import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

@Entity('drivers')
class Driver {
  @PrimaryColumn()
  id?: string

  @Column()
  name: string
  
  @Column()
  CPF: number
  
  @Column()
  RG: string
  
  @Column()
  CNH: number
  
  @Column()
  birthday: string
  
  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}

export { Driver }