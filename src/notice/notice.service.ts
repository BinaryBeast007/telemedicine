import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { NoticeEntity } from './notice.entity';
import { NoticeDTO } from './notice.dto';
import { AdminEntity } from '../admin/admin.entity';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(NoticeEntity)
    private readonly noticeRepository: Repository<NoticeEntity>,
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
  ) {}

  async createNotice(a_id: number, noticeDTO: NoticeDTO): Promise<NoticeEntity> {
    const admin = await this.adminRepository.findOneBy({ a_id });
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${a_id} not found`);
    }

    const notice = new NoticeEntity();
    notice.notice_title = noticeDTO.notice_title;
    notice.notice_description = noticeDTO.notice_description;
    notice.posted_by = admin.a_name; // Assuming admin name should be set as posted_by
    notice.admin = admin;

    return this.noticeRepository.save(notice);
  }

  async updateNotice(notice_id: number, noticeDTO: NoticeDTO): Promise<NoticeEntity> {
    const notice = await this.noticeRepository.findOneBy({ notice_id });
    if (!notice) {
      throw new NotFoundException(`Notice with ID ${notice_id} not found`);
    }

    notice.notice_title = noticeDTO.notice_title;
    notice.notice_description = noticeDTO.notice_description;
    notice.updated_at = new Date();

    return this.noticeRepository.save(notice);
  }

  async deleteNotice(notice_id: number): Promise<void> {
    const result = await this.noticeRepository.delete(notice_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Notice with ID ${notice_id} not found`);
    }
  }

  async getNoticeById(notice_id: number): Promise<NoticeEntity> {
    const notice = await this.noticeRepository.findOne({ where: { notice_id }, relations: ['admin'] });
    if (!notice) {
      throw new NotFoundException(`Notice with ID ${notice_id} not found`);
    }
    return notice;
  }

  async getNoticesByAdminId(a_id: number): Promise<NoticeEntity[]> {
    return this.noticeRepository.find({ where: { admin: { a_id } }, relations: ['admin'] });
  }

  async showAllNotices(): Promise<NoticeEntity[]> {
    return this.noticeRepository.find();
  }

  async getNoticesByDate(date: Date): Promise<NoticeEntity[]> {
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);

    return this.noticeRepository.find({
      where: {
        posted_at: Between(startOfDay, endOfDay),
      },
      relations: ['admin'],
    });
  }
}
