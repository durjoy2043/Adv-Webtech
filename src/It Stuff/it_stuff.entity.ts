import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("it_stuff")
export class ITStuffEntity {
  @PrimaryGeneratedColumn({ unsigned: true }) 
  id: number;

  @Column({ length: 100 }) 
  fullName: string;

  @Column({ unsigned: true }) 
  age: number;

  @Column({ default: 'active', enum: ['active', 'inactive'] })
  status: string;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  gender: string;

  @Column()
  phoneNumber: string;

  @Column()
  profilePicture: string;
}
