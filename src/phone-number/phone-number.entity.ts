import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PhoneNumber {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  number: string;
}
