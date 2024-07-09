import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LojaModule } from './loja/loja.module';

const isDevEnv = process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'developement';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: isDevEnv ? '.env.dev' : `.env`,
    }),
    LojaModule,
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
