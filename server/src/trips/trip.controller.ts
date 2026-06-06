import { Body, Controller, Get, Param, Post, Req, Res } from "@nestjs/common";
import { TripService } from "./trip.service";
import { Trip } from "./entities";
import { FastifyReply } from "fastify";
import { AuthReq } from "../auth/type/auth-req.type";
import { Role, Roles } from "../auth/decorators/roles.decorator";
import { BookTripDto } from "./dto";

@Controller("trip")
export class TripController {
  constructor(private tripService: TripService) {}

  @Roles(Role.MASTER)
  @Get()
  async findAll(@Res() res: FastifyReply) {
    const data: Trip[] | null = await this.tripService.findAll();
    res.send({
      statusCode: 200,
      data,
    });
  }

  @Get(":id")
  async getTripById(@Param("id") id: string, @Res() res: FastifyReply) {
    const trip: Trip | null = await this.tripService.findById(id);
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
