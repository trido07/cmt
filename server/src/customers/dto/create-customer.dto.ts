import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateCustomerDto {
  @ApiProperty({
    description: "Full name of customer",
  })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({
    description: "Phone number of customer",
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(11)
  phone!: string;

  @ApiProperty({
    description: "Full name of contact",
  })
  @IsNotEmpty()
  @IsString()
  contactName!: string;

  @ApiProperty({
    description: "Phone number to contact",
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(11)
  contactPhone!: string;

  @ApiPropertyOptional({
    description: "Note of customer",
  })
  @IsOptional()
  @IsString()
  note?: string;
}
