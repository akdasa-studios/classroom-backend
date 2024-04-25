import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm'
import { Course } from '../courses/courses.entity'

@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToOne(() => Course)
  @JoinColumn()
  course: Course

  @Column()
  title: string
  
  @Column()
  description: string
}

