import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("courses")
export class Course {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  public title: string

  @Column()
  public summary: string

  @Column()
  public coverUrl: string
}
