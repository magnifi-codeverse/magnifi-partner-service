import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtClientGuard extends AuthGuard("jwt-client") {
  // You can extend the basic functionality here if needed
}
