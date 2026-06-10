import { Body, Controller, Get, Param, Post, Put, Res } from "@nestjs/common";
import { VehicleService } from "./vehicle.service";
import { Vehicle } from "./entities";
import { FastifyReply } from "fastify";
import { CreateVehicleDto, EditVehicleDto } from "./dto";
import { Role, Roles } from "../auth/decorators/roles.decorator";

@Controller("vehicle")
export class VehicleController {
  constructor(private vehicleService: VehicleService) {}

  @Get()
  async findAll(@Res() res: FastifyReply) {
    const data: Vehicle[] | null = await this.vehicleService.findAll();
    res.send({
      statusCode: 200,
      data,
    });
  }

  @Roles(Role.MASTER)
  @Post()
  async createVehicle(
    @Body() body: CreateVehicleDto,
    @Res() res: FastifyReply,
  ) {
    const vehicle: Vehicle | null = await this.vehicleService.create(body);
    res.send({
      statusCode: 200,
      data: vehicle,
    });
  }

  @Roles(Role.MASTER)
  @Put("/:id")
  async editVehicle(
    @Body() body: EditVehicleDto,
    @Param("id") id: string,
    @Res() res: FastifyReply,
  ) {
    const vehicle = await this.vehicleService.editVehicleById(id, body);
    res.send({
      statusCode: 200,
      data: vehicle,
    });
  }
}
