import { Controller, Post, Body, Param, ParseIntPipe, Put, Delete, Get, Query } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { NoticeDTO } from './notice.dto';
import { NoticeEntity } from './notice.entity';

@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Post('create/:a_id')
  async createNotice(
    @Param('a_id', ParseIntPipe) a_id: number,
    @Body() noticeDTO: NoticeDTO,
  ): Promise<NoticeEntity> {
    return this.noticeService.createNotice(a_id, noticeDTO);
  }

  @Put('update/:notice_id')
  async updateNotice(
    @Param('notice_id', ParseIntPipe) notice_id: number,
    @Body() noticeDTO: NoticeDTO,
  ): Promise<NoticeEntity> {
    return this.noticeService.updateNotice(notice_id, noticeDTO);
  }

  @Delete('delete/:notice_id')
  async deleteNotice(@Param('notice_id', ParseIntPipe) notice_id: number): Promise<void> {
    return this.noticeService.deleteNotice(notice_id);
  }

  @Get('getById/:notice_id')
  async getNoticeById(@Param('notice_id', ParseIntPipe) notice_id: number): Promise<NoticeEntity> {
    return this.noticeService.getNoticeById(notice_id);
  }

  @Get('allnotices')
  showAllAdmin(): object {
    return this.noticeService.showAllNotices();
  }

  @Get('getByAdminId/:a_id')
  async getNoticesByAdminId(@Param('a_id', ParseIntPipe) a_id: number): Promise<NoticeEntity[]> {
    return this.noticeService.getNoticesByAdminId(a_id);
  }

  @Get('getByDate')
  async getNoticesByDate(@Query('date') date: string): Promise<NoticeEntity[]> {
    const parsedDate = new Date(date);
    return this.noticeService.getNoticesByDate(parsedDate);
  }
}
