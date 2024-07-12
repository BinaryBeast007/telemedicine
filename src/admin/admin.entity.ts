import { UserEntity } from "src/user/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("admin") 
export class AdminEntity{
    @PrimaryGeneratedColumn()
    a_id: number;

    @Column()
    a_name: string;

    @Column()
    a_address: string;

    @Column()
    a_gender: string;

    @Column()
    a_dob: Date

    @Column()
    a_phoneNumber: string;

    @OneToOne(() => UserEntity, user => user.admin)
    @JoinColumn({ name: 'u_id' })
    user: UserEntity;
}