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
    const useCustomChromium = configService.get<string>('CUSTOM_CHROMIUM');
    if (useCustomChromium === 'true') {
      launchOptions.executablePath = '/usr/bin/chromium';
    } else {
      delete launchOptions.executablePath;
    }
    return await puppeteer.launch(launchOptions);
  },
};
