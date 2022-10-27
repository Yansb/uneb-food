import { WeekDay } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

class Owner {
  @IsString()
  name: string;
  @IsString()
  password: string;
  @IsEmail()
  email: string;
  @IsString()
  phoneNumber: string;
}

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

export class Menu {
  @IsEnum(WeekDay)
  weekday: WeekDay;
  @ValidateNested()
  @Type(() => Itens)
  itens: Itens[];
}

export class NewRestaurantDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsLatitude()
  lat: string;
  @IsLongitude()
  log: string;
  @ValidateNested()
  @Type(() => Owner)
  owner: Owner;
  @ValidateNested()
  @Type(() => Menu)
  menus: Menu[];
}
