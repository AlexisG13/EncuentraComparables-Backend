import { Optional } from '@nestjs/common';

export class EstateSearchFilters {
  @Optional()
  min_price?: number;

  @Optional()
  max_price?: number;

  @Optional()
  s?: string;
}
