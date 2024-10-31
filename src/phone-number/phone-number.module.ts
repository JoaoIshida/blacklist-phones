import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneNumberService } from './phone-number.service';
import { PhoneNumber } from './phone-number.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PhoneNumber])],
  providers: [PhoneNumberService],
  exports: [PhoneNumberService],
})
export class PhoneNumberModule {}
