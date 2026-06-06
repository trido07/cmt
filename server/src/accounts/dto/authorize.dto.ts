import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
  @ApiProperty({
    description: "Username",
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    description: "Password",
  })
  @IsString()
  @IsNotEmpty()
  password!: string;
}
export class SignUpDto {}
