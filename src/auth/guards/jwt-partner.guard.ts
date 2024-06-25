import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtPartnerGuard extends AuthGuard("jwt-partner") {
  // You can extend the basic functionality here if needed
}
