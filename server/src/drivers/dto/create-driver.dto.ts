import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateDriverDto {
  @ApiProperty({
    description: "Full name of driver",
  })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({
    description: "Phone number of driver",
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(11)
  phone!: string;

  @ApiPropertyOptional({
    description: "Note of driver",
  })
  @IsOptional()
  @IsString()
  note?: string;
}
