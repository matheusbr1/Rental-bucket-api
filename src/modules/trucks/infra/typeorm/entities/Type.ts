import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

@Entity('truck_types')
class Type {
  @PrimaryColumn()
  id?: string
  
  @Column()
  name: string
  
  @Column()
  description: string
  
  @CreateDateColumn()
  created_at: Date

  constructor() {
    if(!this.id) {
      this.id = uuidV4()
    }
  }
}

export { Type }