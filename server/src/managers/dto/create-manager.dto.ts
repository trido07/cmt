import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateManagerDto {
  @ApiProperty({
    description: "Full name of manager",
  })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({
    description: "Phone number of manager",
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(11)
  phone!: string;

  @ApiPropertyOptional({
    description: "Note of manager",
  })
  @IsOptional()
  @IsString()
  note?: string;
}
