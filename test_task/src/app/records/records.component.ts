import {ChangeDetectorRef, Component, OnChanges, OnInit} from '@angular/core';
import {IRecord} from "../../shared/interfaces/record.interface";
import {RecordsService} from "./records.service";
import {catchError, Subject, take, throwError} from "rxjs";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css'],
  providers: [MessageService]
})
export class RecordsComponent implements OnInit, OnChanges {

  records: IRecord[] = [];
  isEdit: boolean = true;
  selectedRecord$: Subject<any> = new Subject();

  constructor(private readonly recordsService: RecordsService,
              private messageService: MessageService,
              private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.records = this.recordsService.findRecords();
  }

  ngOnChanges() {
    console.log('ngOnChanges', this.records)
    this.records = this.recordsService.findRecords();
    console.log('ngOnChanges changed', this.records)
  }

  onRecordSelected(selectedRecord: IRecord) {
    console.log(selectedRecord);
    this.selectedRecord$.next(selectedRecord);
  }

  closeModal() {
    this.isEdit = true;
    this.selectedRecord$.next(null);
  }

  saveRecord($event: Partial<IRecord>) {
    try {
      this.records = this.recordsService.addRecord($event);
      this.closeModal();
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Record was added'});
    } catch (e: any) {
      this.messageService.add({severity:'error', summary: 'Error', detail: e.message});
    }

  }

  editRecord($event: Partial<IRecord>) {
    try {
      this.records = this.recordsService.editRecord($event);
      this.closeModal();
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Record was edited'});
      this.cd.detectChanges();
    } catch (e: any) {
      this.messageService.add({severity:'error', summary: 'Error', detail: e.message});
    }

  }

  deleteRecord($event: string) {
    try {
      this.records = this.recordsService.deleteRecord($event);
      this.closeModal();
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Record was deleted'});
    } catch (e: any) {
      this.messageService.add({severity:'error', summary: 'Error', detail: e.message});
    }

  }

  onCreateRecordStart() {
    this.selectedRecord$.next(null)
    this.isEdit = false;
  }
}
