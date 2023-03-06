import { CreateSensorDataDTO } from '../../infrastructure/controllers/sensor-data/sensor-data';
import { ISensorDataPort } from '../../domain/ports/sensor-data.port';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
class CreateSensorDataUseCase {
  constructor(private readonly sensorDataPort: ISensorDataPort) {}

  async execute(creatSensorDataDto: CreateSensorDataDTO) {
    if (!isValidValue(creatSensorDataDto.humidity))
      throw new BadRequestException('humidité invalide');
    if (!isValidValue(creatSensorDataDto.soil_fertillity))
      throw new BadRequestException('soil fertillity invalide');
    if (!isValidValue(creatSensorDataDto.temperature))
      throw new BadRequestException('temperature invalide');
    if (!isValidValue(creatSensorDataDto.luminosity))
      throw new BadRequestException('luminosity invalide');

    return await this.sensorDataPort.create(creatSensorDataDto);
  }
}

function isValidValue(value: number): boolean {
  return value >= 0 && value <= 1500;
}
export { CreateSensorDataUseCase };
