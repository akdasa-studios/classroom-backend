import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm'
import { Course } from '../courses/courses.entity'
import { Group } from '../groups/groups.entity'
import { User } from 'src/org/users/users.entity'
import { IsUserExist } from 'src/org/users/users.entity.validators'
import { Validate } from 'class-validator'

const EnrollmentStatusValues = ['new', 'approved', 'declined', 'graduated'] as const
export type EnrollmentStatus = typeof EnrollmentStatusValues[number];

@Entity('enrollments')
export class Enrollment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToOne(() => User)
  @JoinColumn()
  @Validate(IsUserExist)
  applicant: User

  @OneToOne(() => Group, { nullable: true })
  @JoinColumn()
  group?: Group

  @OneToOne(() => Course)
  @JoinColumn()
  course: Course

  @Column({
    type: 'enum',
    enum: EnrollmentStatusValues,
    default: 'new'
  })
  status: EnrollmentStatus
}

