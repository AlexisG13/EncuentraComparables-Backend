import { Optional } from '@nestjs/common';
import { IsIn } from 'class-validator';

enum EstatesEnum{

}
export class EstateSearchFilters {
  @Optional()
  min_price?: number;

  @Optional()
  max_price?: number;

  @Optional()
  s?: string;

  providers: string;
}
