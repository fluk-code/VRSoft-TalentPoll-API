import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import typeormConfig from '@config/data/typeorm/typeorm-config';

import { LojaModule } from './loja/loja.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(typeormConfig()),
    LojaModule,
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
