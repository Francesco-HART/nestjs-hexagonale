import { Injectable } from '@nestjs/common';
import { UserModel } from '../../domain/models/user';
import { ISensorPort, IUpdateSensorDTO } from '../../domain/ports/sensor.port';

@Injectable()
class UpdateSensorUseCase {
  constructor(private readonly sensorPort: ISensorPort) {}
  async execute(id: string, dto: IUpdateSensorDTO, user: UserModel) {
    return await this.sensorPort.update(id, user, dto);
  }
}
export { UpdateSensorUseCase };
