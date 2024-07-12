import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, JoinColumn, RelationId, ManyToOne } from 'typeorm'
import { User, Course } from '@classroom/backend/entities'

@Entity('groups')
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn()
  leader: User

  @RelationId((e: Group) => e.leader)
  leaderId: string

  @ManyToOne(() => Course, { nullable: false, })
  @JoinColumn()
  course: Course

  @RelationId((e: Group) => e.course)
  courseId: string

  @Column({ type: 'timestamp', nullable: true })
  startsAt: Date
}

