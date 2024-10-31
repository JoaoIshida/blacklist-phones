import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneNumberModule } from './phone-number/phone-number.module';
import { PhoneNumber } from './phone-number/phone-number.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'workstream24',
      database: 'blacklist',
      entities: [PhoneNumber],
      synchronize: true,
    }),
    PhoneNumberModule,
  ],
})
export class AppModule {}
