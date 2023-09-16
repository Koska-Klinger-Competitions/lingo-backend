import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  passwordHash: string;

  @Column({ default: 0 })
  xp: number

  @Column({ default: 0})
  league: number

  @Column({ default: 0})
  streak: number

  @Column({ default: true, select: false })
  isActive: boolean;
}
