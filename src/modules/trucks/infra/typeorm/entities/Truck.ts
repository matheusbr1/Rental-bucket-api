import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'
import { Exclude } from 'class-transformer'
import { Type } from './Type'

@Entity('trucks')
class Truck {
  @PrimaryColumn()
  id?: string
  
  @Column()
  brand_id: string // id of brand from FIPE api
  
  @Column()
  model_id: string // id of model from FIPE api
  
  @Column()
  plate: string
  
  @Column()
  @Exclude()
  truck_type_id: string

  @ManyToOne(() => Type, (type) => type.trucks)
  @JoinColumn({ name: "truck_type_id" })
  type: Type
  
  @Column()
  renavam: number
  
  @Column()
  manufacture_year: number
  
  @Column()
  model_year: number
  
  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}

export { Truck }