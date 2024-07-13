import { IsString, IsNotEmpty } from 'class-validator';

export class BlogpostDTO {
  @IsString()
  @IsNotEmpty()
  blog_title: string;

  @IsString()
  @IsNotEmpty()
  blog_description: string;
}
