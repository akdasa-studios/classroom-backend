import { IsNotEmpty, IsString } from 'class-validator'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  public title: string

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  public subtitle: string

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  public description: string

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  public coverImageUrl: string
}

