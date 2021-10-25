import { IEstate } from '../interfaces/estate.interface';

export class SearchEstatesResponse {
  estates: IEstate[];
  averagePrice: number;
  averageSize: number;
}
