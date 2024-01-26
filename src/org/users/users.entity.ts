import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm'
import { Role } from '../roles/roles.entity'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  public name: string

  @ManyToMany(() => Role)
  @JoinTable({ name: 'user_roles'})
  roles: Role[]
}
