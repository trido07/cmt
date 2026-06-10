import {
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  Logger,
} from "@nestjs/common";
import { Account } from "./entities";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAccountDto, SignInDto } from "./dto";
import { hash, compare } from "bcryptjs";
import { DriverService } from "../drivers";
import { CustomerService } from "../customers";
import { AuthService } from "../auth";
import { ManagerService } from "../managers/manager.service";
import { HttpErr } from "../common/error";

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private accountRepo: Repository<Account>,
    @Inject(forwardRef(() => DriverService))
    private readonly driverService: DriverService,
    @Inject(forwardRef(() => CustomerService))
    private readonly customerService: CustomerService,
    @Inject(forwardRef(() => ManagerService))
    private readonly managerService: ManagerService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async findAll(): Promise<Account[] | null> {
    try {
      return await this.accountRepo.find();
    } catch (err: any) {
      HttpErr(err);
    }
  }

  async findById(uuid: string): Promise<Account | null> {
    try {
      return await this.accountRepo.findOne({
        where: {
          id: uuid,
        },
      });
    } catch (err: any) {
      HttpErr(err);
    }
  }

  async findByName(name: string): Promise<Account | null> {
    try {
      return await this.accountRepo.findOne({
        where: {
          name: name,
        },
      });
    } catch (err: any) {
      HttpErr(err);
    }
  }

  async findByNameAndValidatePassword(
    name: string,
    password: string,
  ): Promise<Account | null> {
    try {
      const account = await this.findByName(name);
      if (account == null) {
        throw new HttpException("Wrong username or passowrd", 401);
      }
      const validatePassword = await compare(password, account.password);
      if (!validatePassword) {
        throw new HttpException("Wrong username or passowrd", 401);
      }
      return account;
    } catch (err: any) {
      HttpErr(err);
    }
  }

  async signIn(signInDto: SignInDto) {
    try {
      const { accessToken, expiresIn } =
        await this.authService.signIn(signInDto);

      return {
        statusCode: 200,
        data: { accessToken, expiresIn },
      };
    } catch (err: any) {
      HttpErr(err);
    }
  }

  async createAccount(createAccountDto: CreateAccountDto) {
    try {
      if ((await this.findByName(createAccountDto.name)) != null) {
        throw new HttpException("Account already exist", 409);
      }
      const password = await hash(createAccountDto.password, 10);
      const account = await this.accountRepo.save({
        accountType: createAccountDto.accountType,
        name: createAccountDto.name,
        password: password,
        userId: createAccountDto.userId,
      });
      if (createAccountDto.accountType == "dr") {
        await this.driverService.assignAccount({
          accountId: account.id,
          userId: createAccountDto.userId,
        });
      } else if (createAccountDto.accountType == "ma") {
        await this.managerService.assignAccount({
          accountId: account.id,
          userId: createAccountDto.userId,
        });
      } else if (createAccountDto.accountType == "cu") {
        await this.customerService.assignAccount({
          accountId: account.id,
          userId: createAccountDto.userId,
        });
      }
      return account;
    } catch (err: any) {
      HttpErr(err);
    }
  }

  async deleteAccountById(accountId: string) {
    try {
      await this.accountRepo.delete({
        id: accountId,
      });
    } catch (err: any) {
      HttpErr(err);
    }
  }
}
