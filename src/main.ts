import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PhoneNumberService } from './phone-number/phone-number.service';
import { PhoneNumberModule } from './phone-number/phone-number.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const phoneNumberService = app.get(PhoneNumberService);

  await phoneNumberService.importPhoneNumbersFromCSV('./src/phone.csv');

  await app.close();
}
bootstrap();
