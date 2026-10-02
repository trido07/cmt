import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsOptional, IsString } from "class-validator";

export class MasterEditTripDto {
  @ApiProperty({
    description: "Payload of the trip",
  })
  @IsOptional()
  @IsString()
  payload?: string;

  @ApiProperty({
    description: "Load date by customer",
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  loadDate?: Date;

  @ApiProperty({
    description: "Load address",
  })
  @IsOptional()
  @IsString()
  loadAddress?: string;

  @ApiProperty({
    description: "Delivery address",
  })
  @IsOptional()
  @IsString()
  deliveryAddress?: string;
}

export class ManagerEditTripDto {}
