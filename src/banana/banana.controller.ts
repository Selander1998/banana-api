import { Controller, Get, Req } from '@nestjs/common';
import { BananaService } from './banana.service';

@Controller('/bananas')
export class BananaController {
  private readonly bananaService: BananaService;

  constructor(bananaService: BananaService) {
    this.bananaService = bananaService;
  }

  @Get()
  public async getAllBananas(@Req() request: Request) {
    const cheap = request.body['cheapest'] && request.body['cheapest'] === true;

    return await this.bananaService.getAllBananas(cheap);
  }
}
