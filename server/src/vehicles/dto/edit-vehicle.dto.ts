import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class EditVehicleDto {
  @ApiProperty({
    description: "Vehicle license plate",
  })
  @IsOptional()
  @IsString()
  licensePlate?: string;

  @ApiProperty({
    description: "Vehicle payload",
  })
  @IsOptional()
  @IsString()
  payload?: string;

  @ApiProperty({
    description: "Vehicle trunk size",
  })
  @IsOptional()
  @IsString()
  size?: string;

  @ApiPropertyOptional({
    description: "Note of vehicle",
  })
  @IsOptional()
  @IsString()
  note?: string;
}
