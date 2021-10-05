import { EstateSearchFilters } from '../dtos/get-states-query.dto';
import { IEstate } from './estate.interface';

export interface EstateProvider {
  baseUrl: string;
  buildUrl: (query: EstateSearchFilters) => string;
  parse: (response: string) => IEstate[];
}
