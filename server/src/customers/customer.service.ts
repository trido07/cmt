import {
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "./entities";
import { Repository } from "typeorm";
import { AccountService } from "../accounts/account.service";
import { AssignAccountDto } from "../accounts/dto";
import { CreateCustomerDto, EditCustomerDto } from "./dto";
import { AuthReq } from "../auth/type/auth-req.type";
import { HttpErr } from "../common/error";

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
    @Inject(forwardRef(() => AccountService))
    private readonly accountService: AccountService,
  ) {}

  async findAll(authUser: AuthReq["user"]): Promise<Customer[] | null> {
    try {
      if (authUser.accountType == "mas") {
        return await this.customerRepo.find();
      } else if (authUser.accountType == "ma") {
        return await this.customerRepo.find({
          relations: {
            manager: true,
          },
          where: {
            manager: {
              id: authUser.userId,
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
  ): Promise<Customer | null> {
    try {
      if (authUser?.accountType == "ma") {
        return await this.customerRepo.findOne({
          relations: {
            trips: true,
            account: true,
            manager: true,
          },
          where: {
            id: uuid,
            manager: {
              id: authUser.userId,
            },
          },
        });
      }
      return await this.customerRepo.findOne({
        relations: {
          trips: true,
          account: true,
          manager: true,
        },
        where: {
          id: uuid,
        },
      });
    } catch (err: any) {
      HttpErr(err);
    }
  }

  async createCustomer(
    createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    try {
      return await this.customerRepo.save({
        name: createCustomerDto.name,
        phone: createCustomerDto.phone,
        contactName: createCustomerDto.contactName,
        contactPhone: createCustomerDto.contactPhone,
        note: createCustomerDto.note || "",
      });
    } catch (err: any) {
      HttpErr(err);
    }
  }

  async assignAccount(assignAccountDto: AssignAccountDto): Promise<void> {
    try {
      const customer = await this.findById(assignAccountDto.userId);
      if (customer == null) {
        throw new HttpException("Customer not found", 404);
      }
      if (customer.account != null) {
        throw new HttpException("Customer already has an account", 409);
      }
      const account = await this.accountService.findById(
        assignAccountDto.accountId,
      );
      if (account == null) {
        throw new NotFoundException("Account not found");
      }
      await this.customerRepo.update(
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

  async editCustomerById(id: string, editCustomerDto: EditCustomerDto) {
    try {
      const manager = await this.findById(id);
      if (!manager) {
        throw new HttpException("Customer not found", 404);
      }
      return await this.customerRepo.save({
        ...manager,
        ...editCustomerDto,
      });
    } catch (err: any) {
      HttpErr(err);
    }
  }
}
