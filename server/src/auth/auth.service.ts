import {
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  Logger,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AccountService } from "../accounts/account.service";
import { SignInDto } from "../accounts/dto";
import { Account } from "../accounts/entities";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => AccountService))
    private readonly accountService: AccountService,
    private readonly configService: ConfigService,
  ) {}

  async signIn(signInDto: SignInDto) {
    try {
      let admin: boolean = false;
      if (
        signInDto.name == this.configService.get<string>("masterUsername") &&
        signInDto.password == this.configService.get<string>("masterPassword")
      ) {
        admin = true;
      }
      let validatedAccount: Account | null = null;
      if (!admin) {
        validatedAccount =
          await this.accountService.findByNameAndValidatePassword(
            signInDto.name,
            signInDto.password,
          );
        if (validatedAccount == null) {
          throw new HttpException("Wrong username or password", 401);
        }
      }
      const payload = {
        accountType: validatedAccount ? validatedAccount.accountType : "mas",
        userId: validatedAccount ? validatedAccount.userId : "master",
      };
      const token = await this.jwtService.signAsync(payload);
      return {
        accessToken: token,
        expiresIn: this.configService.get<string>("jwtExpiration"),
      };
    } catch (err: any) {
      if (err instanceof HttpException) {
        throw err;
      } else {
        Logger.log(err.message);
        throw new Error("Internal server error");
      }
    }
  }
}
