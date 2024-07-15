import { BananaModel } from 'src/types';
import { randomUUID } from 'crypto';

interface HemkopBanana {
  priceValue: number;
  priceUnit: string;
  googleAnalyticsCategory: string;
  name: string;
}

interface HemkopProductSearchResponse {
  results: HemkopBanana[];
}

export interface HemkopResponse {
  productSearchPageData: HemkopProductSearchResponse;
}

export class HemkopBananaResponse {
  public data: BananaModel[];

  public constructor(response: HemkopResponse) {
    this.data = response.productSearchPageData.results
      .filter((banana) => {
        return this.isValidCategory(banana.googleAnalyticsCategory);
      })
      .map((banana) => {
        return {
          id: randomUUID() as string,
          store: 'Hemköp',
          name: banana.name,
          price: banana.priceValue,
        } as BananaModel;
      });
  }

  private isValidCategory(category: string) {
    return category.includes('bananer');
  }
}
