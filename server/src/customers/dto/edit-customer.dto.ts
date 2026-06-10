import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength } from "class-validator";

export class EditCustomerDto {
  @ApiProperty({
    description: "Full name of customer",
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: "Phone number of customer",
  })
  @IsOptional()
  @IsString()
  @MaxLength(11)
  phone?: string;

  @ApiProperty({
    description: "Full name of contact",
  })
  @IsOptional()
  @IsString()
  contactName?: string;

  @ApiProperty({
    description: "Phone number to contact",
  })
  @IsOptional()
  @IsString()
  @MaxLength(11)
  contactPhone?: string;

  @ApiPropertyOptional({
    description: "Note of customer",
  })
  @IsOptional()
  @IsString()
  note?: string;
}
