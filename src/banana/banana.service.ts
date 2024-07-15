import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { hemkopBananaUrl, willysBananaUrl } from 'src/http';
import { HemkopResponse, HemkopBananaResponse } from 'src/stores/hemkop/types';
import { WillysResponse, WillysBananaResponse } from 'src/stores/willys/types';

@Injectable()
export class BananaService {
  public async getAllBananas() {
    const hemkopBananas = await this.getHemkopBananas();

    const willysBananas = await this.getWillysBananas();
    console.log(
      '🚀 ~ BananaService ~ getAllBananas ~ willysBananas:',
      willysBananas,
    );

    const bananas = [hemkopBananas, willysBananas].flatMap(
      (storeData) => storeData.data,
    );

    const bananasSorted = bananas.sort((a, b) => a.price - b.price);

    const cheapestBanana = bananasSorted[0];
    console.log('🚀 ~ BananaService ~ cheapestBanana:', cheapestBanana);

    return bananasSorted;
  }

  private async getHemkopBananas() {
    const { data: hemkopBananaResponse } =
      await axios.get<HemkopResponse>(hemkopBananaUrl);

    const hemkopBananas = new HemkopBananaResponse({
      productSearchPageData: hemkopBananaResponse.productSearchPageData,
    });

    return hemkopBananas;
  }

  private async getWillysBananas() {
    const { data: willysBananaResponse } =
      await axios.get<WillysResponse>(willysBananaUrl);

    const willysBananas = new WillysBananaResponse({
      results: willysBananaResponse.results,
    });
    return willysBananas;
  }
}
