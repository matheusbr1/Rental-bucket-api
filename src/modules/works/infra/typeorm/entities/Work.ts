import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'
import { Exclude } from 'class-transformer'
import { Customer } from '../../../../customers/infra/typeorm/entities/Customer'
import { Driver } from '../../../../drivers/infra/typeorm/entities/Driver'
import { Equipment } from '../../../../trucks/infra/typeorm/entities/Equipment'
import { Truck } from '../../../../trucks/infra/typeorm/entities/Truck'
import { WorkType } from './WorkType'
import { Address } from '../../../../_address/infra/typeorm/entities/Address'

export enum WorkStatus {
  CANCELED = "canceled",
  PENDING = "pending",
  PLACED = "placed",
  REMOVED = 'removed',
  'PARTIAL-REMOVED' = 'partial-removed',
}

@Entity('works')
class Work {
  @PrimaryColumn()
  id?: string

  @Column()
  start_date: Date

  @Column()
  end_date: Date

  @Column({
    type: "enum",
    enum: WorkStatus,
    default: WorkStatus.PENDING
  })
  status: WorkStatus;

  @Column()
  quantity: number

  @Column()
  @Exclude()
  customer_id: string

  @ManyToOne(() => Customer)
  @JoinColumn({ name: "customer_id" })
  customer: Customer

  @Column()
  @Exclude()
  address_id: string

  @ManyToOne(() => Address)
  @JoinColumn({ name: "address_id" })
  address: Address

  @Column()
  @Exclude()
  truck_id: string

  @ManyToOne(() => Truck)
  @JoinColumn({ name: "truck_id" })
  truck: Truck

  @Column()
  @Exclude()
  driver_id: string

  @ManyToOne(() => Driver)
  @JoinColumn({ name: "driver_id" })
  driver: Driver

  @Column()
  @Exclude()
  work_type_id: string

  @ManyToOne(() => WorkType)
  @JoinColumn({ name: "work_type_id" })
  work_type: WorkType

  @Column()
  @Exclude()
  equipment_id: string

  @ManyToOne(() => Equipment)
  @JoinColumn({ name: "equipment_id" })
  equipment: Equipment

  @Column()
  company_id: string

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}

export { Work }