import { AdminEntity } from 'src/admin/admin.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, Admin } from 'typeorm';

@Entity("user")
export class UserEntity {
    @PrimaryGeneratedColumn()
    u_id: number;

    @Column()
    u_name: string;

    @Column()
    u_email: string;

    @Column()
    u_password: string;

    @Column()
    u_role: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    status: string;

    @OneToOne(() => AdminEntity, admin => admin.user , { cascade: true })
    admin: AdminEntity;
}
