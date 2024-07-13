import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { AdminEntity } from '../admin/admin.entity';

@Entity('blogpost')
export class BlogpostEntity {
  @PrimaryGeneratedColumn()
  blog_Id: number;

  @Column()
  blog_title: string;

  @Column()
  blog_description: string;

  @Column()
  blog_posted_by: string;

  @CreateDateColumn()
  posted_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => AdminEntity, admin => admin.blogposts)
  admin: AdminEntity;
}
