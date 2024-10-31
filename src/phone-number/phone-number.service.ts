import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as csvParser from 'csv-parser';
import * as fs from 'fs';
import { PhoneNumber } from './phone-number.entity';

@Injectable()
export class PhoneNumberService {
  constructor(
    @InjectRepository(PhoneNumber)
    private phoneNumberRepository: Repository<PhoneNumber>,
  ) {}

  async importPhoneNumbersFromCSV(filePath: string): Promise<void> {
    const phoneNumbers: PhoneNumber[] = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csvParser({ headers: false }))
        .on('data', (row: Record<string, unknown>) => {
          const phoneNumber = this.formatToE164(String(Object.values(row)[0]));
          if (phoneNumber) {
            phoneNumbers.push({ number: phoneNumber } as PhoneNumber);
          }
        })
        .on('end', async () => {
          //console.log('csv success');
          try {
            if (phoneNumbers.length > 0) {
              await this.phoneNumberRepository.save(phoneNumbers);
              console.log('phones to db success');
            } else {
              console.warn('no phones to db');
            }
            resolve();
          } catch (error) {
            console.error('Err with saving phone number to db:', error);
            reject(error);
          }
        })
        .on('error', (error) => {
          console.error('Err reading CSV:', error);
          reject(error);
        });
    });
  }

  private formatToE164(phone: string): string | null {
    //console.log('phone:', phone);
    if (!phone) return null;

    phone = phone.trim();

    if (phone.startsWith('+')) {
      return phone;
    }

    // assuming the us numbers have 10-11 digits and they follow the numbers as shown in the csv
    if (phone.length === 10) {
      return `+1${phone}`;
    } else if (phone.length === 11 && phone.startsWith('1')) {
      return `+${phone}`;
    } else {
      console.warn(`Invalid phone number format: ${phone}`); //edge case to warn
      return null;
    }
  }
}
