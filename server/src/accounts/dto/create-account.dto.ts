import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";

enum AccountType {
  MANAGER = "ma",
  CUSTOMER = "cu",
  DRIVER = "dr",
}

export class CreateAccountDto {
  @ApiProperty({
    description: "Account username",
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    description: "Account password",
  })
  @IsString()
  @IsNotEmpty()
  password!: string;

  @ApiProperty({
    example: "ma",
    enum: ["ma", "cu", "dr"],
    description: "ma-manager, cu-customer, dr-driver",
  })
  @IsEnum(AccountType)
  @IsNotEmpty()
  accountType!: "ma" | "cu" | "dr";

  @ApiProperty({
    description: "User ID",
  })
  @IsUUID()
  @IsNotEmpty()
  userId!: string;
}

export class AssignAccountDto {
  @IsUUID()
  @IsNotEmpty()
  accountId!: string;

  @IsUUID()
  @IsNotEmpty()
  userId!: string;
}
