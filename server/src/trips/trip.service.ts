import { HttpException, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Trip } from "./entities";
import { BookTripDto, ManagerEditTripDto, MasterEditTripDto } from "./dto";
import { CustomerService } from "../customers";
import { HttpErr } from "../common/error";
import { AuthReq } from "../auth/type/auth-req.type";
import { ManagerService } from "../managers";

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripRepo: Repository<Trip>,
    @Inject() private readonly customerService: CustomerService,
    @Inject() private readonly managerService: ManagerService,
  ) {}

  async findAll(authUser: AuthReq["user"]): Promise<Trip[] | null> {
    try {
      if (authUser.accountType == "mas") {
        return await this.tripRepo.find({
          relations: {
            customer: true,
            vehicle: true,
            driver: true,
          },
        });
      } else if (authUser.accountType == "dr") {
        return await this.tripRepo.find({
          relations: {
            driver: true,
          },
          where: {
            driver: {
              id: authUser.userId,
            },
          },
        });
      } else if (authUser.accountType == "cu") {
        return await this.tripRepo.find({
          relations: {
            customer: true,
          },
          where: {
            customer: {
              id: authUser.userId,
            },
          },
        });
      } else if (authUser.accountType == "ma") {
        const manager = await this.managerService.findById(authUser.userId);

        if (!manager) {
          throw new HttpException("Unauthorized", 401);
        }

        return await this.tripRepo.find({
          relations: {
            customer: true,
          },
          where: {
            customer: {
              id: In(manager.customers.map((c) => c.id) || []),
            },
          },
        });
      }
      throw new HttpException("Unauthorized", 401);
    } catch (err: any) {
      HttpErr(err);
    }
  }

  async findById(
    uuid: string,
    authUser?: AuthReq["user"],
  ): Promise<Trip | null> {
    try {
      if (authUser?.accountType == "dr") {
        return await this.tripRepo.findOne({
          relations: {
            driver: true,
          },
          where: {
            driver: {
              id: authUser?.userId,
            },
            id: uuid,
          },
        });
      } else if (authUser?.accountType == "cu") {
        return await this.tripRepo.findOne({
          relations: {
            customer: true,
          },
          where: {
            customer: {
              id: authUser?.userId,
            },
            id: uuid,
          },
        });
      } else if (authUser?.accountType == "ma") {
        const manager = await this.managerService.findById(authUser?.userId);

        if (!manager) {
          throw new HttpException("Unauthorized", 401);
        }

        return await this.tripRepo.findOne({
          relations: {
            customer: true,
          },
          where: {
            customer: {
              id: In(manager.customers.map((c) => c.id) || []),
            },
            id: uuid,
          },
        });
      }
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
      HttpErr(err);
    }
  }

  async bookTrip(
    body: BookTripDto,
    authCustomer: AuthReq["user"],
  ): Promise<Trip | null> {
    try {
      if (authCustomer.accountType != "cu") {
        throw new HttpException("Unauthorized", 401);
      }
      const customer = await this.customerService.findById(authCustomer.userId);
      if (!customer) {
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
      HttpErr(err);
    }
  }

  async editTripById(
    id: string,
    body: MasterEditTripDto | ManagerEditTripDto,
    authUser: AuthReq["user"],
  ) {
    try {
      const trip = await this.findById(id);
      if (!trip) {
        throw new HttpException("Trip not found", 404);
      }
    } catch (err: any) {
      HttpErr(err);
    }
  }
}
