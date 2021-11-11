import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CompareEstatesDto } from './dtos/compare-estates.dto';
import { EstateSearchFilters } from './dtos/get-states-query.dto';
import { EstateService } from './estate.service';

@Controller('estate')
export class EstateController {
  constructor(private readonly estateService: EstateService) {}

  @Get()
  getAllEstates(@Query() filters: EstateSearchFilters) {
    return this.estateService.search(filters);
  }

  @Post('compare')
  compareEstates(@Body() { estate1, estate2 }: CompareEstatesDto) {
    return this.estateService.compare(estate1, estate2);
  }
}
