import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, Res, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminDTO } from "./admin.dto";
import { AdminEntity } from "./admin.entity";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage, MulterError } from "multer";
import { Response } from 'express';
import { SessionGuard } from "src/auth/session.guard";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Post('register')
    @UsePipes(new ValidationPipe())
    async registerAdmin(@Body() adminDTO: AdminDTO): Promise<AdminEntity> {
        try {
            adminDTO.u_password = await this.adminService.hashPassword(adminDTO.u_password);
            return await this.adminService.registerAdmin(adminDTO);
        } catch (error) {
            throw new InternalServerErrorException('Error registering admin');
        }
    }

    @Get('alladmins')
    // @UseGuards(SessionGuard, JwtAuthGuard)
    async showAllAdmin(): Promise<object> {
        try {
            return await this.adminService.showAllAdmins();
        } catch (error) {
            throw new InternalServerErrorException('Error fetching all admins');
        }
    }

    @Get('getById/:id')
    async getAdminById(@Param('id', ParseIntPipe) id: number): Promise<object> {
        try {
            const admin = await this.adminService.getAdminById(id);
            if (!admin) {
                throw new NotFoundException('Admin not found');
            }
            return admin;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Error fetching admin by ID');
        }
    }

    @Post('addimage')
    @UseInterceptors(FileInterceptor('imageFile', {
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
                cb(null, true);
            } else {
                cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
            }
        },
        limits: { fileSize: 1000000 },
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                cb(null, `${Date.now()}-${file.originalname}`);
            },
        }),
    }))
    async addImage(@UploadedFile() file: Express.Multer.File) {
        try {
            return file;
        } catch (error) {
            throw new InternalServerErrorException('Error uploading image');
        }
    }

    @Get('/getimage/:name')
    getImage(@Param('name') filename: string, @Res() res: Response) {
        try {
            res.sendFile(filename, { root: './uploads' });
        } catch (error) {
            throw new InternalServerErrorException('Error fetching image');
        }
    }

    @Put('update/:id')
    async updateAdmin(@Param('id', ParseIntPipe) id: number, @Body() updatedAdmin: AdminDTO): Promise<AdminEntity> {
        try {
            updatedAdmin.u_password = await this.adminService.hashPassword(updatedAdmin.u_password);
            return await this.adminService.updateAdmin(id, updatedAdmin);
        } catch (error) {
            throw new InternalServerErrorException('Error updating admin');
        }
    }

    @Patch('patch/:id')
    async patchAdmin(@Param('id', ParseIntPipe) id: number, @Body() partialAdmin: Partial<AdminDTO>): Promise<AdminEntity> {
        try {
            return await this.adminService.patchAdmin(id, partialAdmin);
        } catch (error) {
            throw new InternalServerErrorException('Error patching admin');
        }
    }

    @Delete('delete/:id')
    async deleteAdmin(@Param('id', ParseIntPipe) id: number): Promise<object> {
        try {
            await this.adminService.deleteAdmin(id);
            return { message: `Admin with ID ${id} successfully deleted` };
        } catch (error) {
            throw new InternalServerErrorException('Error deleting admin');
        }
    }

    @Get('getquery')
    async getAdminByQuery(@Query('a_id', ParseIntPipe) a_id: number, @Query('a_name') a_name: string): Promise<object> {
        try {
            const admin = await this.adminService.getAdminByQuery(a_id, a_name);
            if (!admin) {
                throw new NotFoundException('Admin not found');
            }
            return admin;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Error fetching admin by query');
        }
    }
}
