import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Role, ROLES_KEY } from "./decorators/roles.decorator";
import { AuthReq } from "./type/auth-req.type";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requiredRoles) {
        return true;
      }

      const request: AuthReq = context.switchToHttp().getRequest();
      const [type, token] = request.headers.authorization?.split(" ") ?? [];
      if (type != "Bearer") {
        throw new UnauthorizedException();
      }

      const payload = await this.jwtService.verifyAsync(token);
      request["user"] = payload;

      return requiredRoles.some((role) => payload.accountType == role);
    } catch (err: any) {
      Logger.log(err.message);
      throw new UnauthorizedException();
    }
  }
}
