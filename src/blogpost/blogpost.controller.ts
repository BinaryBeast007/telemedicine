import { Controller, Post, Get, Put, Delete, Param, Body, Query, ParseIntPipe } from '@nestjs/common';
import { BlogpostService } from './blogpost.service';
import { BlogpostDTO } from './blogpost.dto';
import { BlogpostEntity } from './blogpost.entity';

@Controller('blogpost')
export class BlogpostController {
  constructor(private readonly blogpostService: BlogpostService) {}

  @Post('create/:adminId')
  async createBlogpost(
    @Param('adminId', ParseIntPipe) adminId: number,
    @Body() blogpostDTO: BlogpostDTO
  ): Promise<BlogpostEntity> {
    return await this.blogpostService.createBlogpost(blogpostDTO, adminId);
  }

  @Get('getAll')
  async getAllBlogposts(): Promise<BlogpostEntity[]> {
    return await this.blogpostService.getAllBlogposts();
  }

  @Get('getById/:blogId')
  async getBlogpostById(@Param('blogId', ParseIntPipe) blogId: number): Promise<BlogpostEntity> {
    return await this.blogpostService.getBlogpostById(blogId);
  }

  @Get('getByAdminId/:adminId')
  async getBlogpostsByAdminId(@Param('adminId', ParseIntPipe) adminId: number): Promise<BlogpostEntity[]> {
    return await this.blogpostService.getBlogpostsByAdminId(adminId);
  }

  @Get('getByDate')
  async getBlogpostsByDate(@Query('date') date: string): Promise<BlogpostEntity[]> {
    return await this.blogpostService.getBlogpostsByDate(date);
  }

  @Put('update/:blogId')
  async updateBlogpost(
    @Param('blogId', ParseIntPipe) blogId: number,
    @Body() blogpostDTO: BlogpostDTO
  ): Promise<BlogpostEntity> {
    return await this.blogpostService.updateBlogpost(blogId, blogpostDTO);
  }

  @Delete('delete/:blogId')
  async deleteBlogpost(@Param('blogId', ParseIntPipe) blogId: number): Promise<void> {
    return await this.blogpostService.deleteBlogpost(blogId);
  }
}
