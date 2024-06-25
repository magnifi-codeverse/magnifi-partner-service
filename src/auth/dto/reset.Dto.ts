import { IsNotEmpty, IsString } from "class-validator";

export class ResetDto {
  @IsString()
  @IsNotEmpty()
  entityId: string;
}
