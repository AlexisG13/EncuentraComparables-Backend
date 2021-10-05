import { Module } from '@nestjs/common';
import { EstateService } from './estate.service';
import { EstateController } from './estate.controller';
import { puppeteerProvider } from './puppeteer.provider';

@Module({
  providers: [puppeteerProvider, EstateService],
  imports: [],
  controllers: [EstateController],
})
export class EstateModule {}
