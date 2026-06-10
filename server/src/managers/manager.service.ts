import {
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Manager } from "./entities";
import { Repository } from "typeorm";
import { Customer } from "../customers/entities";
import { AccountService } from "../accounts/account.service";
import { AssignAccountDto } from "../accounts/dto";
import { CreateManagerDto, EditManagerDto } from "./dto";

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(Manager)
    private readonly managerRepo: Repository<Customer>,
    @Inject(forwardRef(() => AccountService))
    private readonly accountService: AccountService,
  ) {}

  async findAll(): Promise<Manager[] | null> {
    try {
      return await this.managerRepo.find();
    } catch (err: any) {
      Logger.log(err.message);
      throw new Error("Internal server error");
    }
  }

  async findById(uuid: string): Promise<Manager | null> {
    try {
      return await this.managerRepo.findOne({
        where: {
          id: uuid,
        },
        relations: {
          account: true,
        },
      });
    } catch (err: any) {
      Logger.log(err.message);
      throw new Error("Internal server error");
    }
  }

  async createManager(createmanagerDto: CreateManagerDto): Promise<Manager> {
    try {
      return await this.managerRepo.save({
        name: createmanagerDto.name,
        phone: createmanagerDto.phone,
        note: createmanagerDto.note || "",
      });
    } catch (err: any) {
      Logger.log(err.message);
      throw new Error("Internal server error");
    }
  }

  async assignAccount(assignAccountDto: AssignAccountDto): Promise<void> {
    try {
      const manager = await this.findById(assignAccountDto.userId);
      if (manager == null) {
        throw new HttpException("Manager not found", 404);
      }
      if (manager.account != null) {
        throw new HttpException("Manager already has an account", 409);
      }
      const account = await this.accountService.findById(
        assignAccountDto.accountId,
      );
      if (account == null) {
        throw new NotFoundException("Account not found");
      }
      await this.managerRepo.update(
        { id: assignAccountDto.userId },
        { account },
      );
    } catch (err: any) {
      try {
        await this.accountService.deleteAccountById(assignAccountDto.accountId);
      } catch (err: any) {
        Logger.log(err.message);
      }
      if (err instanceof HttpException) {
        throw err;
      } else {
        Logger.log(err.message);
        throw new Error("Internal server error");
      }
    }
  }

  async editManagerById(id: string, editManagerDto: EditManagerDto) {
    try {
      const manager = await this.findById(id);
      if (!manager) {
        throw new HttpException("Manager not found", 404);
      }
      return await this.managerRepo.save({
        ...manager,
        ...editManagerDto,
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
}
