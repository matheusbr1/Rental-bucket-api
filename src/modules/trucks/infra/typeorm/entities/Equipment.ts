import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { Type } from './Type'
import { Exclude } from 'class-transformer'

@Entity('truck_type_equipments')
class Equipment {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  capacity: string

  @ManyToOne(() => Type, (type) => type.equipments)
  @JoinColumn({ name: "truck_type_id" })
  type: Type
 
  @Column()
  @Exclude()
  truck_type_id: string

  @CreateDateColumn()
  created_at: Date

  constructor () {
    if (!this.id) {
      this.id = uuidv4()
    }
  }
}

export { Equipment }