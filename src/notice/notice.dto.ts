import { IsString, IsNotEmpty } from 'class-validator';

export class NoticeDTO {
  @IsString()
  @IsNotEmpty()
  notice_title: string;

  @IsString()
  @IsNotEmpty()
  notice_description: string;
}
