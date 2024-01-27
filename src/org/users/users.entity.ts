import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm'
import { Role } from '../roles/roles.entity'

export type UserStatus = 'invited' | 'active' | 'inactive'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  public name: string

  @Column()
  public email: string

  @Column({
    type: 'enum',
    enum: ['invited', 'active', 'inactive'],
    default: 'active'
  })
  public status: UserStatus

  @ManyToMany(() => Role)
  @JoinTable({ name: 'user_roles'})
  roles: Role[]

  @Column({
    nullable: true,
	})
	title?: string

	@Column({
    nullable: true,
	})
	department?: string

	@Column({
    nullable: true,
	})
	avatarUrl?: string
}
