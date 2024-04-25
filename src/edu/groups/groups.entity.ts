import { User } from 'src/org/users/users.entity'
import { IsUserExist } from 'src/org/users/users.entity.validators'
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, BaseEntity } from 'typeorm'

@Entity('groups')
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  description?: string

  @OneToOne(() => User, { nullable: false })
  leader: User 

  @Column()
  @IsUserExist()
  leaderId: string

  @Column()
  startsAt: number

}

