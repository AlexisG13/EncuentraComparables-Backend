import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EstateModule } from './estate/estate.module';

@Module({
  imports: [EstateModule, ConfigModule.forRoot({ isGlobal: true })],
})
export class AppModule {}
