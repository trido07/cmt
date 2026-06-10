import {
  Body,
  Controller,
  Get,
  ParseUUIDPipe,
  Post,
  Query,
  Res,
} from "@nestjs/common";
import { AccountService } from "./account.service";
import { Account } from "./entities";
import { FastifyReply } from "fastify";
import { CreateAccountDto } from "./dto/create-account.dto";
import { SignInDto } from "./dto";
import { Role, Roles } from "../auth/decorators/roles.decorator";

@Controller("/account")
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Roles(Role.MASTER)
  @Get()
  async findAll(@Res() res: FastifyReply) {
    const data: Account[] | null = await this.accountService.findAll();

    res.send({
      statusCode: 200,
      data,
    });
  }

  @Roles(Role.MASTER)
  @Get("/:id")
  async findById(
    @Query("id", new ParseUUIDPipe()) id: string,
    @Res() res: FastifyReply,
  ) {
    const data: Account | null = await this.accountService.findById(id);

    res.send({
      statusCode: 200,
      data,
    });
  }

  @Roles(Role.MASTER)
  @Post("/create")
  async createNewAccount(
    @Body() body: CreateAccountDto,
    @Res() res: FastifyReply,
  ) {
    const account: Account | null =
      await this.accountService.createAccount(body);

    res.send({
      statusCode: 201,
      data: account,
    });
  }

  @Post("/login")
  async signIn(@Body() body: SignInDto, @Res() res: FastifyReply) {
    const json = await this.accountService.signIn(body);
    res.send(json);
  }
}
