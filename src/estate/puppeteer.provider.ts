import { ConfigService } from '@nestjs/config';
import * as puppeteer from 'puppeteer';

export const puppeteerProvider = {
  provide: 'PUPPETEER_BROWSER',
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const launchOptions = {
      executablePath: undefined,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    };
    const useCustomChromium = configService.get<boolean>('CUSTOM_CHROMIUM');
    if (useCustomChromium) {
      launchOptions.executablePath = '/usr/bin/chromium';
    }
    return await puppeteer.launch(launchOptions);
  },
};
