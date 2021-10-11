import { ConfigService } from '@nestjs/config';
import * as puppeteer from 'puppeteer';

export const puppeteerProvider = {
  provide: 'PUPPETEER_BROWSER',
  inject: [ConfigService],
  useFactory: async () => {
    return await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process', // <- this one doesn't works in Windows
        '--disable-gpu',
      ],
      headless: true,
    });
  },
};
