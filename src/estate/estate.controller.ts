import { Controller, Get, Query } from '@nestjs/common';
import { EstateSearchFilters } from './dtos/get-states-query.dto';
import { EstateService } from './estate.service';

@Controller('estate')
export class EstateController {
  constructor(private readonly estateService: EstateService) {}

  @Get()
  getAllEstates(@Query() filters: EstateSearchFilters) {
    return this.estateService.search(filters);
  }
}
