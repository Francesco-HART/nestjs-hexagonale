import { Types } from 'mongoose';
import { PlantModel } from './plant';
import { UserModel } from './user';

interface SensorModel {
  _id: Types.ObjectId;
  name: string;
  plant: PlantModel;
  location?: string;
  serial_number: string;
  user: UserModel;
}

export { SensorModel };
