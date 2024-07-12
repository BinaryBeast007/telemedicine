import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, Res, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminDTO } from "./admin.dto";
import { AdminEntity } from "./admin.entity";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage, MulterError } from "multer";
import { Response } from 'express';


@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Post('register')
    async registerAdmin(@Body() adminDTO: AdminDTO): Promise<AdminEntity> {
        return this.adminService.registerAdmin(adminDTO);
    }

    @Get('alladmins')
    showAllAdmin(): object {
        return this.adminService.showAllAdmins();
    }

    @Get('getById/:id')
    getAdminById(@Param('id', ParseIntPipe) id: number): object {
        return this.adminService.getAdminById(id);
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

    addImage(@UploadedFile() file: Express.Multer.File) {
        return file;
    }

    @Get('/getimage/:name')
    getImage(@Param('name') filename: string, @Res() res: Response) {
        res.sendFile(filename, { root: './uploads' });
    }

    @Put('update/:id')
    async updateAdmin(@Param('id', ParseIntPipe) id: number, @Body() updatedAdmin: AdminDTO): Promise<AdminEntity> {
        return this.adminService.updateAdmin(id, updatedAdmin);
    }

    @Patch('patch/:id')
    async patchAdmin(@Param('id', ParseIntPipe) id: number, @Body() partialAdmin: Partial<AdminDTO>): Promise<AdminEntity> {
        return this.adminService.patchAdmin(id, partialAdmin);
    }

    @Delete('delete/:id')
    async deleteAdmin(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.adminService.deleteAdmin(id);
    }
}