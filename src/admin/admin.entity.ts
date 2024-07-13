import { AuditLogEntity } from "src/audit-log/audit-log.entity";
import { BlogpostEntity } from "src/blogpost/blogpost.entity";
import { NoticeEntity } from "src/notice/notice.entity";
import { UserEntity } from "src/user/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(() => NoticeEntity, notice => notice.admin)
    notices: NoticeEntity[];

    @OneToMany(() => AuditLogEntity, auditLog => auditLog.admin)
    auditLogs: AuditLogEntity[];

    @OneToMany(() => BlogpostEntity, blogpost => blogpost.admin)
    blogposts: BlogpostEntity[];
}