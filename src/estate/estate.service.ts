import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import * as https from 'https';
import { EstateSearchFilters } from './dtos/get-states-query.dto';
import { SearchEstatesResponse } from './dtos/search-estates-response.dto';
import {
  BienesRaicesDienca,
  BienesRaicesEnElSalvador,
  Encuentra24,
  RemaxCentral,
} from './estate_providers/encuentra24';
import { EstateComparisonResult } from './interfaces/estare-comparison-result';
import { EstateProvider } from './interfaces/estate-provider.interface';
import { IEstate } from './interfaces/estate.interface';

@Injectable()
export class EstateService {
  constructor() {}

  private availableProviders = [
    new Encuentra24(),
    new BienesRaicesDienca(),
    new RemaxCentral(),
    new BienesRaicesEnElSalvador(),
  ];

  async getSingleProviderEstates(
    provider: EstateProvider,
    filters: EstateSearchFilters,
  ): Promise<IEstate[]> {
    try {
      const res: AxiosResponse<string, any> = await axios.get(
        provider.buildUrl(filters),
        {
          httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        },
      );
      return provider.parse(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  async searchEstates(filters: EstateSearchFilters): Promise<IEstate[]> {
    const estateRequests = Array.from(this.availableProviders).map((provider) =>
      this.getSingleProviderEstates(provider, filters),
    );
    const estates = await Promise.all(estateRequests);
    return estates.reduce((acum, curr) => acum.concat(curr));
  }

  async search(filters: EstateSearchFilters): Promise<SearchEstatesResponse> {
    const response = new SearchEstatesResponse();
    response.estates = await this.searchEstates(filters);
    response.averagePrice = this.getAverage(
      response.estates,
      (estate) => estate.price,
    );
    response.averageSize = this.getAverage(
      response.estates,
      (estate) => estate.size,
    );
    return response;
  }

  async compare(
    estate1: IEstate,
    estate2: IEstate,
  ): Promise<EstateComparisonResult> {
    const pricePercentage = this.compareProperty(estate1, estate2, 'price');
    const sizePercentage = this.compareProperty(estate1, estate2, 'size');
    return { pricePercentage, sizePercentage };
  }

  private compareProperty(
    estate1: IEstate,
    estate2: IEstate,
    field: string,
  ): number {
    let bestEstate: IEstate;
    let worstEstate: IEstate;
    if (!estate1[field] || !estate2[field])
      throw new UnprocessableEntityException(
        `La propiedad no tiene un valor de ${field}`,
      );
    if (estate1[field] > estate2[field]) {
      bestEstate = estate2;
      worstEstate = estate1;
    } else {
      bestEstate = estate1;
      worstEstate = estate2;
    }
    const percentage = bestEstate[field] / worstEstate[field] - 1;

    return parseFloat(percentage.toFixed(2));
  }

  getAverage<T>(array: Array<T>, mapper: (element: T) => number): number {
    return array
      .map(mapper)
      .filter(Boolean) // don't include falsy values
      .reduce((avg, curr, _, { length }) => avg + curr / length);
  }
}
