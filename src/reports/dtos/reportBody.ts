import { IsString, IsNumber, IsDate, IsBoolean, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReportBodyDto {
  @ApiProperty({ default: 70000 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ default: "This is the best car i've ever owned" })
  @IsString()
  content: string;

  @ApiProperty({ default: 50 })
  @IsNumber()
  lat: number;

  @ApiProperty({ default: 50 })
  @IsNumber()
  lng: number;
}

export class ResponseReportDto extends ReportBodyDto {
  @IsDate()
  created_at: Date;

  @IsDate()
  updated_at: Date;

  @ApiProperty({ default: false })
  @IsBoolean()
  is_approved: boolean;

  @IsNumber()
  user: number;
}

export class ParamsDto {
  @IsString()
  reportId: string;
}
