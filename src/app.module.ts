import { Module } from '@nestjs/common';
import { BananaController } from './banana/banana.controller';
import { BananaService } from './banana/banana.service';

@Module({
  imports: [],
  controllers: [BananaController],
  providers: [BananaService],
})
export class AppModule {}
