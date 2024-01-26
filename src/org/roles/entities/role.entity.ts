import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  public name: string

  @Column()
  public description: string

  @Column('varchar', { array: true })
  public permissions: string[]
}
