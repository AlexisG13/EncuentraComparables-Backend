import { Module } from '@nestjs/common';
import { EstateService } from './estate.service';

@Module({
  providers: [EstateService],
})
export class EstateModule {}
