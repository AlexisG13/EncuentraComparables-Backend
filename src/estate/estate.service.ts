import { Inject, Injectable } from '@nestjs/common';
import { Browser } from 'puppeteer';
import { EstateSearchFilters } from './dtos/get-states-query.dto';
import {
  BienesRaicesDienca,
  BienesRaicesEnElSalvador,
  Encuentra24,
  RemaxCentral,
} from './estate_providers/encuentra24';
import { EstateProvider } from './interfaces/estate-provider.interface';
import { IEstate } from './interfaces/estate.interface';

@Injectable()
export class EstateService {
  constructor(@Inject('PUPPETEER_BROWSER') private browser: Browser) {}

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
    const page = await this.browser.newPage();
    await page.goto(provider.buildUrl(filters), {
      waitUntil: 'domcontentloaded',
    });
    const content = await page.content();
    await page.close();
    return provider.parse(content);
  }

  async searchEstates(filters: EstateSearchFilters): Promise<IEstate[]> {
    const estateRequests = Array.from(this.availableProviders).map((provider) =>
      this.getSingleProviderEstates(provider, filters),
    );
    const estates = await Promise.all(estateRequests);
    return estates.reduce((acum, curr) => acum.concat(curr));
  }
}
