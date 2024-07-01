import { Injectable, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class ApiKeyPartnerGuard extends AuthGuard("api-key-partner") {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
}
