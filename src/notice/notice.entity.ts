import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { AdminEntity } from '../admin/admin.entity';

@Entity('notice')
export class NoticeEntity {
    @PrimaryGeneratedColumn()
    notice_id: number;

    @Column()
    notice_title: string;

    @Column()
    notice_description: string;

    @Column()
    posted_by: string;

    @CreateDateColumn()
    posted_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => AdminEntity, admin => admin.notices)
    admin: AdminEntity;
}
