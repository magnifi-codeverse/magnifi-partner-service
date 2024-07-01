import { Injectable, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class ApiKeyMagnifiGuard extends AuthGuard("api-key-magnifi") {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
}
