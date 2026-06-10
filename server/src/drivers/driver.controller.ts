import { Body, Controller, Get, Param, Post, Put, Res } from "@nestjs/common";
import { CreateDriverDto, EditDriverDto } from "./dto";
import { DriverService } from "./driver.service";
import { FastifyReply } from "fastify";
import { Driver } from "./entities";
import { Role, Roles } from "../auth/decorators/roles.decorator";

@Controller("/driver")
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Roles(Role.MANAGER, Role.MASTER)
  @Get()
  async getAllDriver(@Res() res: FastifyReply) {
    const drivers: Driver[] | null = await this.driverService.findAll();
    res.send({
      statusCode: 200,
      data: drivers,
    });
  }

  @Get(":id")
  async getDriverById(@Param("id") id: string, @Res() res: FastifyReply) {
    const driver: Driver | null = await this.driverService.findById(id);
    res.send({
      statusCode: 200,
      data: driver,
    });
  }

  @Roles(Role.MASTER)
  @Post()
  async createDriver(@Body() body: CreateDriverDto, @Res() res: FastifyReply) {
    const driver = await this.driverService.createDriver(body);
    res.send({
      statusCode: 200,
      data: driver,
    });
  }

  @Roles(Role.MASTER)
  @Put("/:id")
  async editDriverById(
    @Param("id") id: string,
    @Res() res: FastifyReply,
    @Body() body: EditDriverDto,
  ) {
    const driver: Driver | null = await this.driverService.editDriverById(
      id,
      body,
    );
    res.send({
      statusCode: 200,
      data: driver,
    });
  }
}
