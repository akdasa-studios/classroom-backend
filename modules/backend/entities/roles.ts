import { IsNotEmpty, IsString } from 'class-validator'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  @IsString()
  @IsNotEmpty()
  public name: string

  @Column()
  @IsString()
  @IsNotEmpty()
  public description: string

  @Column('varchar', { array: true, nullable: true })
  public permissions: string[]
}
