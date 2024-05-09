import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, RelationId, BaseEntity } from 'typeorm'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { Role } from '@classroom/admin/entities'

export type UserStatus = 'invited' | 'active' | 'inactive'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  @IsString()
  @IsNotEmpty()
  public name: string

  @Column({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  // @IsUserExist()
  public email: string

  @Column({
    type: 'enum',
    enum: ['invited', 'active', 'inactive'],
    default: 'active'
  })
  public status: UserStatus

  @ManyToMany(() => Role, { eager: true })
  @JoinTable({ name: 'user_roles' })
  roles: Role[]

  @RelationId((user: User) => user.roles)
  roleIds: string[]

  @Column({ nullable: true })
	title?: string

	@Column({ nullable: true })
	department?: string

	@Column({ nullable: true })
	avatarUrl?: string

  public get permissions(): string[] {
    return this.roles.flatMap(x => x.permissions)
  }
}

