import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
} from "@nestjs/common";
import { TripService } from "./trip.service";
import { Trip } from "./entities";
import { FastifyReply } from "fastify";
import { AuthReq } from "../auth/type/auth-req.type";
import { Role, Roles } from "../auth/decorators/roles.decorator";
import { BookTripDto } from "./dto";

@Controller("trip")
export class TripController {
  constructor(private tripService: TripService) {}

  @Roles(Role.CUSTOMER, Role.MASTER, Role.DRIVER, Role.MANAGER)
  @Get()
  async findAll(@Res() res: FastifyReply, @Req() req: AuthReq) {
    const data: Trip[] | null = await this.tripService.findAll(req.user);
    res.send({
      statusCode: 200,
      data,
    });
  }

  @Roles(Role.CUSTOMER, Role.MASTER, Role.DRIVER, Role.MANAGER)
  @Get(":id")
  async getTripById(
    @Param("id") id: string,
    @Req() req: AuthReq,
    @Res() res: FastifyReply,
  ) {
    const trip: Trip | null = await this.tripService.findById(id, req.user);
    res.send({
      statusCode: 200,
      data: trip,
    });
  }

  @Put("/id")
  async editTrip(
    @Param("id") id: string,
    @Req() req: AuthReq,
    @Res() res: FastifyReply,
    @Body() body: any,
  ) {
    const trip = await this.tripService.editTripById(id, body, req.user);
    res.send({
      statusCode: 200,
      data: trip,
    });
  }

  @Roles(Role.CUSTOMER)
  @Post("/book")
  async bookTrip(
    @Req() req: AuthReq,
    @Res() res: FastifyReply,
    @Body() body: BookTripDto,
  ) {
    const trip = await this.tripService.bookTrip(body, req.user);
    res.send({
      statusCode: 200,
      data: trip,
    });
  }
}
