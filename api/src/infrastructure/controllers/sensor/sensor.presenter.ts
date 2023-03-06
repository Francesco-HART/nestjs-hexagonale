import { ApiProperty } from '@nestjs/swagger';
import { SensorModel } from '../../../domain/models/sensor';
import { UserPresenter } from '../user/user.presenter';
import { PlantPresenter } from '../plant/plant.presenter';
import { SensorDataEntity } from '../../../infrastructure/entities/sensor-data.entity';
import { SensorData } from '../../../domain/models/SensorData';
import { SensorDataPresenter } from '../sensor-data/sensor-data.presenter';

class SensorPresenter {
  @ApiProperty()
  id: string;
  @ApiProperty()
  user: UserPresenter | null;
  @ApiProperty()
  plant: PlantPresenter | null;
  @ApiProperty()
  name: string;
  @ApiProperty()
  location?: string;
  @ApiProperty()
  serial_number: string;

  @ApiProperty()
  sensor_data?: SensorDataPresenter;

  constructor(sensor: SensorModel, sensor_data?: SensorData) {
    this.id = sensor._id.toString();
    this.user = sensor.user ? new UserPresenter(sensor.user) : null;
    this.plant = sensor.plant ? new PlantPresenter(sensor.plant) : null;
    this.name = sensor.name;
    this.location = sensor.location || '';
    this.serial_number = sensor.serial_number;
    if (sensor_data) this.sensor_data = new SensorDataPresenter(sensor_data);
  }
}

export { SensorPresenter };
