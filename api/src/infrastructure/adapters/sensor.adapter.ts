import { NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ICreateSensorDTO,
  ISensorPort,
  IUpdateSensorDTO,
} from '../../domain/ports/sensor.port';
import { UserEntity } from '../../infrastructure/entities/user.entity';
import { SensorDocument, SensorEntity } from '../entities/sensor.entity';
import { SensorModel } from '../../domain/models/sensor';
import { PlantDocument, PlantEntity } from '../entities/plant.entity';
import { MongoError } from 'mongodb';
import { UserModel } from '../../domain/models/user';

export class SensorAdaptater implements ISensorPort {
  constructor(
    @InjectModel(SensorEntity.name)
    private readonly sensorEntity: Model<SensorDocument>,
    @InjectModel(PlantEntity.name)
    private readonly plantEntity: Model<PlantDocument>,
  ) {}

  async fetchAllSensors(): Promise<SensorModel[]> {
    try {
      return await this.sensorEntity.find().populate('plant user');
    } catch (error) {
      throw new Error(error);
    }
  }

  async fetchOneBySerialNumber(serialNumber: string): Promise<SensorModel> {
    try {
      return await this.sensorEntity
        .findOne({ serial_number: serialNumber })
        .populate('plant user');
    } catch (error) {
      throw new Error(error);
    }
  }

  async fetchOne(id: string): Promise<SensorModel> {
    try {
      return await this.sensorEntity
        .findOne({ _id: id })
        .populate('plant user');
    } catch (error) {
      throw new Error(error);
    }
  }

  async fetchMy(user: UserEntity): Promise<SensorModel[]> {
    try {
      return await this.sensorEntity
        .find({ user: user._id })
        .populate('plant user');
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(
    serialNumber: string,
    user: UserModel,
    dto: IUpdateSensorDTO,
  ): Promise<SensorEntity> {
    try {
      const existingSensor = await this.sensorEntity.findOne({
        serial_number: serialNumber,
      });

      const existingPlant = await this.plantEntity.findById(dto.plant_id);

      if (!existingSensor) throw new NotFoundException('sensor introuvable');

      if (!existingPlant) throw new NotFoundException('plant introuvable');

      const plandId = dto.plant_id;
      delete dto.plant_id;

      return await this.sensorEntity
        .findOneAndUpdate(
          { serial_number: serialNumber },
          {
            ...dto,
            user: user._id,
            plant: plandId,
          },
          { new: true },
        )
        .populate('plant user');
    } catch (error) {
      if (error instanceof NotFoundException)
        throw new NotFoundException(error.message, serialNumber);
      throw new MongoError(error);
    }
  }

  async create(createSensorDto: ICreateSensorDTO): Promise<SensorEntity> {
    try {
      return await new this.sensorEntity({
        ...createSensorDto,
      })
        .save()
        .then((sensor) => sensor.populate('plant user'));
    } catch (error) {
      throw new MongoError(error);
    }
  }

  async deleteSensor(sensorId: string): Promise<SensorModel> {
    try {
      const deletedSensor = await this.sensorEntity.findOneAndDelete({
        _id: sensorId,
      });
      return deletedSensor;
    } catch (error) {
      throw new MongoError(error);
    }
  }
}
