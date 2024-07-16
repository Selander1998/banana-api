import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { hemkopBananaUrl, willysBananaUrl } from 'src/http';
import { HemkopResponse, HemkopBananaResponse } from 'src/stores/hemkop/types';
import { WillysResponse, WillysBananaResponse } from 'src/stores/willys/types';

@Injectable()
export class BananaService {
  public async getAllBananas(cheapest: boolean) {
    const hemkopBananas = await this.getHemkopBananas();
    const willysBananas = await this.getWillysBananas();

    const bananas = [hemkopBananas, willysBananas].flatMap((s) => s.data);

    const bananasSorted = bananas.sort((a, b) => a.price - b.price);

    return (cheapest && bananasSorted[0]) || bananasSorted;
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
