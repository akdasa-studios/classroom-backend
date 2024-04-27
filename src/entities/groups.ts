import { Entity, Column, PrimaryGeneratedColumn, OneToOne, BaseEntity, JoinColumn, RelationId } from 'typeorm'
import { User } from '@classroom/admin/entities'

@Entity('groups')
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  description?: string

  @OneToOne(() => User, { nullable: false })
  @JoinColumn()
  leader: User 

  @RelationId((e: Group) => e.leader)
  leaderId: string

  @Column()
  startsAt: number
}

