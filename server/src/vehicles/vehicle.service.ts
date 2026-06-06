import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Vehicle } from "./entities";
import { CreateVehicleDto } from "./dto";

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepo: Repository<Vehicle>,
  ) {}

  async findAll(): Promise<Vehicle[] | null> {
    try {
      return await this.vehicleRepo.find();
    } catch (err: any) {
      Logger.log(err.message);
      throw new Error("Internal server error");
    }
  }

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle | null> {
    try {
      return await this.vehicleRepo.save({
        licensePlate: createVehicleDto.licensePlate,
        payload: createVehicleDto.payload,
        size: createVehicleDto.size,
        note: createVehicleDto.note,
      });
    } catch (err: any) {
      throw new Error("Internal server error");
    }
  }
}
