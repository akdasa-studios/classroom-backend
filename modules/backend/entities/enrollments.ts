import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, RelationId, ManyToOne } from 'typeorm'
import { User, Group, Course } from '@classroom/backend/entities'
import { IsUserExist } from '@classroom/backend/validation'

const EnrollmentStatusValues = ['pending', 'approved', 'declined', 'graduated'] as const
export type EnrollmentStatus = typeof EnrollmentStatusValues[number];

@Entity('enrollments')
export class Enrollment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => User)
  @JoinColumn()
  applicant: User

  @RelationId((e: Enrollment) => e.applicant)
  applicantId: string

  @ManyToOne(() => Group, { nullable: true })
  group?: Group

  @RelationId((e: Enrollment) => e.group)
  groupId: string | null

  @ManyToOne(() => Course)
  course: Course

  @RelationId((e: Enrollment) => e.course)
  courseId: string

  @Column({
    type: 'enum',
    enum: EnrollmentStatusValues,
    default: 'pending'
  })
  status: EnrollmentStatus

  @ManyToOne(() => User)
  @JoinColumn()
  declinedBy?: User

  @RelationId((e: Enrollment) => e.declinedBy)
  declinedById: string | null

  @Column({ type: 'timestamp', nullable: true })
  archivedAt: Date
}
