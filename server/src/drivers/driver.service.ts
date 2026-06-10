import {
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { CreateDriverDto, EditDriverDto } from "./dto";
import { Repository } from "typeorm";
import { Driver } from "./entities";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountService } from "../accounts/account.service";
import { AssignAccountDto } from "../accounts/dto";
import { HttpErr } from "../common/error";

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepo: Repository<Driver>,
    @Inject(forwardRef(() => AccountService))
    private readonly accountService: AccountService,
  ) {}

  async findAll(): Promise<Driver[] | null> {
    try {
      return await this.driverRepo.find();
    } catch (err: any) {
      HttpErr(err);
    }
  }

  async findById(uuid: string): Promise<Driver | null> {
    try {
      return await this.driverRepo.findOne({
        where: {
          id: uuid,
        },
        relations: {
          trips: true,
          account: true,
        },
      });
    } catch (err: any) {
      HttpErr(err);
    }
  }

  async createDriver(createDriverDto: CreateDriverDto): Promise<Driver> {
    try {
      return await this.driverRepo.save({
        name: createDriverDto.name,
        phone: createDriverDto.phone,
        note: createDriverDto.note || "",
      });
    } catch (err: any) {
      HttpErr(err);
    }
  }

  async assignAccount(assignAccountDto: AssignAccountDto): Promise<void> {
    try {
      const driver = await this.findById(assignAccountDto.userId);
      if (driver == null) {
        throw new HttpException("Driver not found", 404);
      }
      if (driver.account != null) {
        throw new HttpException("Driver already has an account", 409);
      }
      const account = await this.accountService.findById(
        assignAccountDto.accountId,
      );
      if (account == null) {
        throw new NotFoundException("Account not found");
      }
      await this.driverRepo.update(
        { id: assignAccountDto.userId },
        { account },
      );
    } catch (err: any) {
      try {
        await this.accountService.deleteAccountById(assignAccountDto.accountId);
      } catch (err: any) {
        Logger.log(err.message);
      }
      HttpErr(err);
    }
  }

  async editDriverById(id: string, editDriverDto: EditDriverDto) {
    try {
      const driver = await this.findById(id);
      if (!driver) {
        throw new HttpException("Driver not found", 404);
      }
      return await this.driverRepo.save({
        ...driver,
        ...editDriverDto,
      });
    } catch (err: any) {
      HttpErr(err);
    }
  }
}
