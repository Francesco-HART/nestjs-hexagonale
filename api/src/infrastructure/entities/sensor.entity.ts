import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { SensorModel } from '../../domain/models/sensor';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from './user.entity';
import { PlantEntity } from './plant.entity';
import { UserModel } from '../../domain/models/user';
import { PlantModel } from '../../domain/models/plant';

@Schema()
class SensorEntity implements SensorModel {
  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: UserEntity.name })
  user: UserModel;

  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: PlantEntity.name })
  plant: PlantModel;

  @ApiProperty()
  _id: Types.ObjectId;

  @ApiProperty()
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  serial_number;

  @ApiProperty()
  @Prop({
    type: String,
  })
  name: string;

  @ApiProperty()
  @Prop({
    type: String,
  })
  location?: string;
}

type SensorDocument = SensorEntity & Document;

const SensorSchema = SchemaFactory.createForClass(SensorEntity);

export { SensorEntity, SensorDocument, SensorSchema };
