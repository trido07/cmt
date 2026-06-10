import { Body, Controller, Get, Param, Post, Put, Res } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { CreateCustomerDto, EditCustomerDto } from "./dto";
import { Customer } from "./entities";
import { FastifyReply } from "fastify";
import { Role, Roles } from "../auth/decorators/roles.decorator";

@Controller("/customer")
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Roles(Role.MASTER)
  @Get()
  async getAllCustomer(@Res() res: FastifyReply) {
    const customers: Customer[] | null = await this.customerService.findAll();
    res.send({
      statusCode: 200,
      data: customers,
    });
  }

  @Get(":id")
  async getCustomerById(@Param("id") id: string, @Res() res: FastifyReply) {
    const customer: Customer | null = await this.customerService.findById(id);
    res.send({
      statusCode: 200,
      data: customer,
    });
  }

  @Roles(Role.MASTER)
  @Post()
  async createCustomer(
    @Body() body: CreateCustomerDto,
    @Res() res: FastifyReply,
  ) {
    const customer = await this.customerService.createCustomer(body);
    res.send({
      statusCode: 200,
      data: customer,
    });
  }

  @Roles(Role.MASTER)
  @Put("/:id")
  async editCustomer(
    @Body() body: EditCustomerDto,
    @Param("id") id: string,
    @Res() res: FastifyReply,
  ) {
    const customer = await this.customerService.editCustomerById(id, body);
    res.send({
      statusCode: 200,
      data: customer,
    });
  }
}
