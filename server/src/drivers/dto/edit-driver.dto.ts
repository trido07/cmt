import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength } from "class-validator";

export class EditDriverDto {
  @ApiProperty({
    description: "Full name of driver",
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: "Phone number of driver",
  })
  @IsOptional()
  @IsString()
  @MaxLength(11)
  phone?: string;

  @ApiPropertyOptional({
    description: "Note of driver",
  })
  @IsOptional()
  @IsString()
  note?: string;
}
