import { WeekDay } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

class Itens {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsUrl()
  @IsString()
  imageUrl?: string;
}

export class UpdateMenuDto {
  @IsEnum(WeekDay)
  weekday: WeekDay;
  @ValidateNested()
  @Type(() => Itens)
  itens: Itens[];
}
