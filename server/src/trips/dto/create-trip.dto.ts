import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class BookTripDto {
  @ApiProperty({
    description: "Payload of the trip",
  })
  @IsNotEmpty()
  @IsString()
  payload!: string;

  @ApiProperty({
    description: "Load date by customer",
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  loadDate!: Date;

  @ApiProperty({
    description: "Load address",
  })
  @IsNotEmpty()
  @IsString()
  loadAddress!: string;

  @ApiProperty({
    description: "Delivery address",
  })
  @IsNotEmpty()
  @IsString()
  deliveryAddress!: string;
}
