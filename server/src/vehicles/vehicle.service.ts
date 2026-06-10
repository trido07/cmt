import { HttpException, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Vehicle } from "./entities";
import { CreateVehicleDto, EditVehicleDto } from "./dto";
import { HttpErr } from "../common/error";

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
      HttpErr(err);
    }
  }

  async findById(uuid: string): Promise<Vehicle | null> {
    try {
      return await this.vehicleRepo.findOne({
        where: {
          id: uuid,
        },
        relations: {
          trips: true,
        },
      });
    } catch (err: any) {
      HttpErr(err);
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
      HttpErr(err);
    }
  }

  async editVehicleById(id: string, editVehicleDto: EditVehicleDto) {
    try {
      const manager = await this.findById(id);
      if (!manager) {
        throw new HttpException("Vehicle not found", 404);
      }
      return await this.vehicleRepo.save({
        ...manager,
        ...editVehicleDto,
      });
    } catch (err: any) {
      HttpErr(err);
    }
  }
}
