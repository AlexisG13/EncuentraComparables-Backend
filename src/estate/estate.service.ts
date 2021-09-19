import { Injectable } from '@nestjs/common';
import { InjectBrowser } from 'nest-puppeteer';
import { Browser } from 'puppeteer';

@Injectable()
export class EstateService {
  constructor(@InjectBrowser() private readonly browser: Browser) {}
}
