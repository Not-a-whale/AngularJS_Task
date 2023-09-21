import {Injectable} from '@angular/core';
import {v4 as uuid} from 'uuid';
import {faker} from '@faker-js/faker';
import {UserTypeEnum} from "../../shared/enums/user-type.enum";
import {IRecord} from "../../shared/interfaces/record.interface";
import {recordsKey} from "../../shared/constants";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  generateRecord(record?: Partial<IRecord>): IRecord {
    return {
      username: uuid(), // Generate a UUID v4 for the username
      first_name: record?.first_name ? record.first_name : faker.name.firstName(),
      last_name: record?.last_name ? record.last_name : faker.name.lastName(),
      email: record?.email ? record.email : faker.internet.email(),
      password: record?.password ? record.password : faker.internet.password(),
      user_type: record?.user_type ? record.user_type : !!(Math.floor(Math.random() * 10) % 2) ? UserTypeEnum.ADMIN : UserTypeEnum.DRIVER, // Set the user type as needed
    };
  }

  findRecords(): IRecord[] {
    const localStorageRecords = localStorage.getItem(recordsKey);
    if (localStorageRecords) {
      return JSON.parse(localStorageRecords);
    } else {
      const records: IRecord[] = [];
      for (let i = 0; i < 10; i++) {
        records.push(this.generateRecord());
      }
      localStorage.setItem(recordsKey, JSON.stringify(records));
      return records;
    }
  }

  addRecord(record: Partial<IRecord>): IRecord[] {
    const localStorageRecords = localStorage.getItem(recordsKey);
    if (localStorageRecords) {
      const records: IRecord[] = JSON.parse(localStorageRecords);
      const generatedRecord = this.generateRecord(record)
      records.push(generatedRecord);
      localStorage.setItem(recordsKey, JSON.stringify(records));
      return this.findRecords();
    } else {
      throw new Error('Error occured while adding record');
    }
  }

  editRecord(record: Partial<IRecord>): IRecord[] {
    const localStorageRecords = localStorage.getItem(recordsKey);
    if (localStorageRecords) {
      const records: IRecord[] = JSON.parse(localStorageRecords);
      const index = records.findIndex((r: IRecord) => r.username === record.username);
      records[index] = {...records[index], ...record};
      localStorage.setItem(recordsKey, JSON.stringify(records));
      return this.findRecords();
    } else {
      throw new Error('Error occured while editing record')
    }
  }


  deleteRecord(username: string) {
    const localStorageRecords = localStorage.getItem(recordsKey);
    if (localStorageRecords) {
      const records: IRecord[] = JSON.parse(localStorageRecords);
      const index = records.findIndex((r: IRecord) => r.username === username);
      records.splice(index, 1);
      localStorage.setItem(recordsKey, JSON.stringify(records));
      return this.findRecords();
    } else {
      throw new Error('Error occured while deleting record')
    }
  }
}
