import { IsNotEmpty, IsString } from 'class-validator'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import { User } from './users'

@Entity('sessions')
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn()
  user: User

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  public refreshToken: string

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  public scope: string
}
