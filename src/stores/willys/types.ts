import { BananaModel } from '../../../src/types';
import { randomUUID } from 'crypto';

interface WillysBanana {
  priceValue: number;
  price: string;
  priceUnit: string;
  name: string;
}

export interface WillysResponse {
  results: WillysBanana[];
}

export class WillysBananaResponse {
  public data: BananaModel[];

  public constructor(response: WillysResponse) {
    this.data = response.results
      .filter((banana) => {
        return this.isValidBananaName(banana.name);
      })
      .map((banana) => {
        return {
          id: randomUUID() as string,
          store: 'Willys',
          name: banana.name,
          price: banana.priceValue,
        } as BananaModel;
      });
  }

  private isValidBananaName(name: string) {
    return name.toLowerCase().includes('banan');
  }
}
