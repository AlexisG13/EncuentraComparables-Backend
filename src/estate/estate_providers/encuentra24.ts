import { EstateProvider } from '../interfaces/estate-provider.interface';
import { IEstate } from '../interfaces/estate.interface';
import * as cheerio from 'cheerio';
import { EstateSearchFilters } from '../dtos/get-states-query.dto';

export class Encuentra24 implements EstateProvider {
  baseUrl =
    'https://www.encuentra24.com/el-salvador-es/searchresult/bienes-raices-venta-de-propiedades?q=f_currency.USD';

  buildUrl(query: EstateSearchFilters): string {
    return this.baseUrl;
  }

  parse(response: string): IEstate[] {
    const $ = cheerio.load(response);
    return $('.ann-subcat-listing')
      .find('article')
      .toArray()
      .map((el) => {
        return {
          title: $('.ann-box-title', el).text(),
          price: parseFloat($('.ann-price-2nd div', el).text().split('$')[1]),
          location: $('.ann-info-item', el).text(),
          size: parseFloat($('.value:first', el).text()),
          description: $('.ann-box-desc', el).text(),
        };
      });
  }
}

export class BienesRaicesEnElSalvador implements EstateProvider {
  baseUrl = 'https://www.bienesraicesenelsalvador.com/properties';

  buildUrl(query: EstateSearchFilters): string {
    return this.baseUrl;
  }

  parse(response: string): IEstate[] {
    const $ = cheerio.load(response);
    return $('#mg_property_listings')
      .find('.property-listing')
      .toArray()
      .map((el) => {
        return {
          title: $('.property-header h4 ', el).text(),
          price: (() => {
            const price = $('.listing-type-price', el)
              .text()
              .split('$')[1]
              ?.replace(',', '');
            return price ? parseFloat(price) : null;
          })(),
          location: $('.property-header h5', el).text(),
          size: (() => {
            const size = $(".property-info p:contains('m²')", el)
              .text()
              ?.replace(',', '');
            return size ? parseFloat(size) : null;
          })(),
          description: 'N/A',
        };
      });
  }
}

export class BienesRaicesDienca implements EstateProvider {
  baseUrl =
    'https://bienesraicesdienca.com/?s=&es_search%5Bprice%5D%5Bmin%5D=&es_search%5Bprice%5D%5Bmax%5D=&post_type=properties';

  buildUrl(query: EstateSearchFilters): string {
    return this.baseUrl;
  }

  parse(response: string): IEstate[] {
    const $ = cheerio.load(response);
    return $('.entry-content')
      .toArray()
      .map((el) => {
        const title = $('.es-col-view h2 a', el).text();
        return {
          title,
          price: parseFloat(
            $('.es-col-view .es-price', el)
              .text()
              .split('$')[1]
              .replace(',', ''),
          ),
          size: parseFloat($('.es-bottom-icon', el).text()),
          location: title,
          description: 'N/A',
        };
      });
  }
}

export class RemaxCentral implements EstateProvider {
  baseUrl = 'https://remax-central.com.sv/es/busqueda/';

  filters = new Map([
    ['s', 'query'],
    ['min_price', 'price_min'],
    ['max_price', 'price_max'],
  ]);

  buildUrl(query: EstateSearchFilters): string {
    const searchFilters = Object.keys(query).map((filter) => {
      return [this.filters.get(filter), query[filter]];
    });
    let url = this.baseUrl;
    if (searchFilters.length !== 0) {
      url += 'advanced?';
      for (const filter of searchFilters) {
        url += `${filter[0]}=${filter[1]}&`;
      }
    }
    return url;
  }

  parse(response: string): IEstate[] {
    const $ = cheerio.load(response);
    return $('.sm-col-6')
      .toArray()
      .map((el) => {
        return {
          title: $('.property-description p:first strong', el).text(),
          price: parseFloat(
            $('.property-price', el).text().split('$')[1].replace(/,/g, ''),
          ),
          location: $('.property-description p:nth-child(3)', el).text(),
          size: null,
          description: 'N/A',
        };
      });
  }
}
