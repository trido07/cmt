import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength } from "class-validator";

export class EditManagerDto {
  @ApiProperty({
    description: "Full name of manager",
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: "Phone number of manager",
  })
  @IsOptional()
  @IsString()
  @MaxLength(11)
  phone?: string;

  @ApiPropertyOptional({
    description: "Note of manager",
  })
  @IsOptional()
  @IsString()
  note?: string;
}
