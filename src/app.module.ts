import { Module } from '@nestjs/common';
import { EstateModule } from './estate/estate.module';

@Module({
  imports: [EstateModule]
})
export class AppModule {}
