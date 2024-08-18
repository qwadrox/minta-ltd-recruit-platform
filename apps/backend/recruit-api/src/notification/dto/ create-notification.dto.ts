import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { StatusType } from '../enum/statis.enum';

export class CreateNotificationDto {
  @ApiProperty({ description: 'Name of the candidate' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Status of the event',
    enum: StatusType,
    enumName: 'StatusType',
  })
  @IsEnum(StatusType)
  @IsNotEmpty()
  status: StatusType;

  @ApiProperty({ description: 'Position of the candidate' })
  @IsString()
  @IsNotEmpty()
  position: string;

  @ApiProperty({ description: 'Email of the candidate' })
  @IsString()
  @IsNotEmpty()
  email: string;
}
