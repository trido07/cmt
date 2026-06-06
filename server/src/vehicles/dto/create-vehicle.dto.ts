import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateVehicleDto {
  @ApiProperty({
    description: "Vehicle license plate",
  })
  @IsNotEmpty()
  @IsString()
  licensePlate!: string;

  @ApiProperty({
    description: "Vehicle payload",
  })
  @IsNotEmpty()
  @IsString()
  payload!: string;

  @ApiProperty({
    description: "Vehicle trunk size",
  })
  @IsNotEmpty()
  @IsString()
  size!: string;

  @ApiPropertyOptional({
    description: "Note of vehicle",
  })
  @IsOptional()
  @IsString()
  note?: string;
}
