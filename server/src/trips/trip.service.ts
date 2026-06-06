import { HttpException, Inject, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Trip } from "./entities";
import { BookTripDto } from "./dto";
import { CustomerService } from "../customers";
import { Role, Roles } from "../auth/decorators/roles.decorator";

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripRepo: Repository<Trip>,
    @Inject() private readonly customerService: CustomerService,
  ) {}

  @Roles(Role.MASTER)
  async findAll(): Promise<Trip[] | null> {
    try {
      return await this.tripRepo.find();
    } catch (err: any) {
      Logger.log(err.message);
      throw new Error("Internal server error");
    }
  }

  async findById(uuid: string): Promise<Trip | null> {
    try {
      return await this.tripRepo.findOne({
        where: {
          id: uuid,
        },
        relations: {
          customer: true,
          vehicle: true,
          driver: true,
        },
      });
    } catch (err: any) {
      if (err instanceof HttpException) {
        throw err;
      } else {
        Logger.log(err.message);
        throw new Error("Internal server error");
      }
    }
  }

  async bookTrip(
    body: BookTripDto,
    customerDataFromReq: {
      accountType: string;
      userId: string;
    },
  ): Promise<Trip | null> {
    try {
      const customer = await this.customerService.findById(
        customerDataFromReq.userId,
      );
      if (!customer || customerDataFromReq.accountType != "cu") {
        throw new HttpException("Unauthorized", 401);
      }
      const newTrip = await this.tripRepo.save({
        customer: customer,
        payload: body.payload,
        loadDate: new Date(body.loadDate),
        loadAddress: body.loadAddress,
        deliveryAddress: body.deliveryAddress,
      });
      return newTrip;
    } catch (err: any) {
      if (err instanceof HttpException) {
        throw err;
      } else {
        Logger.log(err.message);
        throw new Error("Internal server error");
      }
    }
  }
}
