import { Module } from '@nestjs/common';
import { EstateService } from './estate.service';
import { PuppeteerModule } from 'nest-puppeteer';

@Module({
  providers: [EstateService],
  imports: [PuppeteerModule.forRoot()],
})
export class EstateModule {}
