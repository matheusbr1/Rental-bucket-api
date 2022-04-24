import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'
import { Equipment } from './Equipment'

@Entity('truck_types')
class Type {
  @PrimaryColumn()
  id?: string
  
  @Column()
  name: string
  
  @Column()
  description: string

  @OneToMany(() => Equipment, (equipment) => equipment.type)
  equipments: Equipment[]
  
  @CreateDateColumn()
  created_at: Date

  constructor() {
    if(!this.id) {
      this.id = uuidV4()
    }
  }
}

export { Type }