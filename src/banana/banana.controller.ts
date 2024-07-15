import { Controller, Get } from '@nestjs/common';
import { BananaService } from './banana.service';

@Controller('/bananas')
export class BananaController {
  private readonly bananaService: BananaService;

  constructor(bananaService: BananaService) {
    this.bananaService = bananaService;
  }

  @Get()
  public async getAllBananas() {
    return await this.bananaService.getAllBananas();
  }
}
