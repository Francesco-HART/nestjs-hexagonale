import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import {
  ICreateSensorDTO,
  IUpdateSensorDTO,
} from '../../../domain/ports/sensor.port';
import { Types } from 'mongoose';

abstract class CreateSensorDTO implements ICreateSensorDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  serial_number: string;
}

abstract class UpdateSensorDTO implements IUpdateSensorDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  plant_id: Types.ObjectId;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  location: string;
}

export { CreateSensorDTO, UpdateSensorDTO };
