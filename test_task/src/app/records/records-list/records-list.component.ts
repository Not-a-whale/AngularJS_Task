import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {IRecord} from "../../../shared/interfaces/record.interface";

@Component({
  selector: 'records-list',
  templateUrl: './records-list.component.html',
  styleUrls: ['./records-list.component.css']
})
export class RecordsListComponent implements OnChanges {

  @Input() records: IRecord[] = [];
  @Output() recordSelected: EventEmitter<IRecord> = new EventEmitter<IRecord>();
  selectedRecord: IRecord | undefined;
  editedRecord: IRecord | undefined;

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.selectedRecord)
  }

  selectRecord(selectedRecord: IRecord) {
    this.editedRecord = selectedRecord;
    this.recordSelected.emit(selectedRecord);
  }

  submitRecord() {
    console.log(this.editedRecord)
  }
}
