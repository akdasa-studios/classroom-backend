import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  public title: string

  @Column()
  public subtitle: string

  @Column()
  public description: string

  @Column()
  public coverImageUrl: string
}

