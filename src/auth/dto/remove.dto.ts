import { IsString, IsNotEmpty } from "class-validator";

export class RemoveDto {
  @IsString()
  @IsNotEmpty()
  partnerApiKeyId: string;

  @IsString()
  @IsNotEmpty()
  entityId: string;
}
