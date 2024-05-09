import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, RelationId, ManyToOne } from 'typeorm'
import { Course } from '@classroom/admin/entities'

@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Course)
  @JoinColumn()
  course: Course

  @RelationId((e: Lesson) => e.course)
  courseId: string

  @Column()
  title: string
  
  @Column()
  description: string
}

