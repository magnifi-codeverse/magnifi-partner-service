import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  IsDateString,
  IsIn,
  IsObject,
  IsNumber,
  Min,
  Max,
} from "class-validator";

export class CreateStreamDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsOptional()
  @IsIn(["now", new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$")])
  fireAt?: "now" | string;

  @IsDateString()
  @IsNotEmpty()
  streamStartTime: string;

  @IsUrl()
  @IsOptional()
  publishingWebhookUrl?: string;

  @IsObject()
  @IsOptional()
  fields?: Record<string, any>;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(1)
  hls_live_start_index?: number = 1;

  @IsString()
  @IsNotEmpty()
  templateName: string;

  @IsString()
  @IsOptional()
  entityId?: string;
}
