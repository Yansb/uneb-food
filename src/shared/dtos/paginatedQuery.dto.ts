import { Transform } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class PaginatedQueryDto {
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => +value)
  offset: number;

  @IsNumber()
  @Min(1)
  @Transform(({ value }) => +value)
  perPage: number;
}
