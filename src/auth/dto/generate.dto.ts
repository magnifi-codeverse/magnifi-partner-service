import { IsNotEmpty, IsString } from "class-validator";
import { Expose } from "class-transformer";

export class GenerateDto {
  @IsString()
  @IsNotEmpty()
  entityId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  organizationMemberId: string;
}

export class GenerateResponseDto {
  @Expose({ name: "partner_api_key" })
  @IsString()
  @IsNotEmpty()
  partnerApiKey: string;

  @Expose({ name: "partner_api_key_id" })
  @IsString()
  @IsNotEmpty()
  partnerApiKeyId: string;

  @Expose({ name: "entity_id" })
  @IsString()
  @IsNotEmpty()
  entityId: string;
}
