import { Body, Controller, Get, Param, Post, Put, Res } from "@nestjs/common";
import { FastifyReply } from "fastify";
import { ManagerService } from "./manager.service";
import { Manager } from "./entities";
import { CreateManagerDto } from "./dto";
import { Role, Roles } from "../auth/decorators/roles.decorator";
import { EditManagerDto } from "./dto/edit-manager.dto";

@Controller("/manager")
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Roles(Role.MASTER)
  @Get()
  async getAllManager(@Res() res: FastifyReply) {
    const customers: Manager[] | null = await this.managerService.findAll();
    res.send({
      statusCode: 200,
      data: customers,
    });
  }

  @Get(":id")
  async getManagerById(@Param("id") id: string, @Res() res: FastifyReply) {
    const manager: Manager | null = await this.managerService.findById(id);
    res.send({
      statusCode: 200,
      data: manager,
    });
  }

  @Roles(Role.MASTER)
  @Post()
  async createManager(
    @Body() body: CreateManagerDto,
    @Res() res: FastifyReply,
  ) {
    const manager = await this.managerService.createManager(body);
    res.send({
      statusCode: 200,
      data: manager,
    });
  }

  @Roles(Role.MASTER)
  @Put("/:id")
  async editManager(
    @Body() body: EditManagerDto,
    @Param("id") id: string,
    @Res() res: FastifyReply,
  ) {
    const manager = await this.managerService.editManagerById(id, body);
    res.send({
      statusCode: 200,
      data: manager,
    });
  }
}
