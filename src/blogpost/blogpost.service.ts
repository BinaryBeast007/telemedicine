import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogpostEntity } from './blogpost.entity';
import { BlogpostDTO } from './blogpost.dto';
import { AdminEntity } from '../admin/admin.entity';
import { AuditLogService } from '../audit-log/audit-log.service';

@Injectable()
export class BlogpostService {
  constructor(
    @InjectRepository(BlogpostEntity)
    private readonly blogpostRepository: Repository<BlogpostEntity>,
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
    private readonly auditLogService: AuditLogService,
  ) {}

  async createBlogpost(blogpostDTO: BlogpostDTO, adminId: number): Promise<BlogpostEntity> {
    const admin = await this.adminRepository.findOne({ where: { a_id: adminId } });

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    const blogpost = this.blogpostRepository.create({
      ...blogpostDTO,
      blog_posted_by: admin.a_name,
      posted_at: new Date(),
      updated_at: new Date(),
      admin,
    });

    const savedBlogpost = await this.blogpostRepository.save(blogpost);

    await this.auditLogService.createLog({
      action: 'Create Blogpost',
      performed_by: admin.a_name,
      performed_at: new Date(),
      adminId: admin.a_id,
    });

    return savedBlogpost;
  }

  async getAllBlogposts(): Promise<BlogpostEntity[]> {
    return await this.blogpostRepository.find();
  }

  async getBlogpostById(blogId: number): Promise<BlogpostEntity> {
    const blogpost = await this.blogpostRepository.findOne({ where: { blog_Id: blogId } });
    if (!blogpost) {
      throw new NotFoundException('Blogpost not found');
    }
    return blogpost;
  }

  async getBlogpostsByAdminId(adminId: number): Promise<BlogpostEntity[]> {
    return await this.blogpostRepository.find({ where: { admin: { a_id: adminId } } });
  }

  async getBlogpostsByDate(date: string): Promise<BlogpostEntity[]> {
    return await this.blogpostRepository.createQueryBuilder('blogpost')
      .where('DATE(blogpost.posted_at) = :date', { date })
      .getMany();
  }

  async updateBlogpost(blogId: number, blogpostDTO: BlogpostDTO): Promise<BlogpostEntity> {
    await this.blogpostRepository.update(blogId, {
      ...blogpostDTO,
      updated_at: new Date(),
    });

    const updatedBlogpost = await this.blogpostRepository.findOne({ 
      where: { blog_Id: blogId },
      relations: ['admin']
    });

    if (!updatedBlogpost) {
      throw new NotFoundException('Blogpost not found');
    }

    await this.auditLogService.createLog({
      action: 'Update Blogpost',
      performed_by: updatedBlogpost.blog_posted_by,
      performed_at: new Date(),
      adminId: updatedBlogpost.admin.a_id,
    });

    return updatedBlogpost;
  }

  async deleteBlogpost(blogId: number): Promise<void> {
    const blogpost = await this.blogpostRepository.findOne({ 
      where: { blog_Id: blogId },
      relations: ['admin']
    });

    if (!blogpost) {
      throw new NotFoundException('Blogpost not found');
    }

    await this.blogpostRepository.remove(blogpost);

    await this.auditLogService.createLog({
      action: 'Delete Blogpost',
      performed_by: blogpost.blog_posted_by,
      performed_at: new Date(),
      adminId: blogpost.admin.a_id,
    });
  }
}
