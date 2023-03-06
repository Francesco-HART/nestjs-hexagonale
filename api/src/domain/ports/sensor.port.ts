import { SensorModel } from '../models/sensor';
import { UserModel } from '../models/user';
import { Types } from 'mongoose';

interface ICreateSensorDTO {
  serial_number: string;
}

interface IUpdateSensorDTO {
  name: string;
  location?: string;
  plant_id: Types.ObjectId;
}

abstract class ISensorPort {
  abstract create(createSensorDto: ICreateSensorDTO): Promise<SensorModel>;

  abstract update(
    id: string,
    user: UserModel,
    createSensorDto: IUpdateSensorDTO,
  ): Promise<SensorModel>;

  abstract fetchMy(user: UserModel): Promise<SensorModel[]>;

  abstract fetchAllSensors(): Promise<SensorModel[]>;

  abstract fetchOne(id: string): Promise<SensorModel>;

  abstract fetchOneBySerialNumber(serialNumber: string): Promise<SensorModel>;

  abstract deleteSensor(sensorId: string): Promise<SensorModel>;
}

export { ISensorPort, ICreateSensorDTO, IUpdateSensorDTO };
