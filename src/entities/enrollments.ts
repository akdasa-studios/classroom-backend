import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, RelationId } from 'typeorm'
import { User, Group, Course } from '@classroom/admin/entities'
import { IsUserExist } from '@classroom/admin/validation'

const EnrollmentStatusValues = ['new', 'approved', 'declined', 'graduated'] as const
export type EnrollmentStatus = typeof EnrollmentStatusValues[number];

@Entity('enrollments')
export class Enrollment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToOne(() => User)
  @JoinColumn()
  applicant: User

  @RelationId((e: Enrollment) => e.applicant)
  applicantId: string

  @OneToOne(() => Group, { nullable: true })
  group?: Group

  @RelationId((e: Enrollment) => e.group)
  groupId: string | null

  @OneToOne(() => Course)
  course: Course

  @RelationId((e: Enrollment) => e.course)
  courseId: string

  @Column({
    type: 'enum',
    enum: EnrollmentStatusValues,
    default: 'new'
  })
  status: EnrollmentStatus
}

