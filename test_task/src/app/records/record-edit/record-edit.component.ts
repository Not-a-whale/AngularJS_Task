import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IRecord} from "../../../shared/interfaces/record.interface";
import {UserTypeEnum} from "../../../shared/enums/user-type.enum";

@Component({
  selector: 'record-edit',
  templateUrl: './record-edit.component.html',
  styleUrls: ['./record-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecordEditComponent implements OnInit, OnChanges {
  @Input() record!: IRecord;
  @Input() isEdit: boolean = true;
  @Output() editRecord = new EventEmitter<Partial<IRecord>>();
  @Output() deleteRecord = new EventEmitter<string>();
  @Output() saveRecord = new EventEmitter<Partial<IRecord>>();
  @Output() close = new EventEmitter<void>();

  get title(): string {
    return this.record ? 'Edit Record' : 'Add Record';
  }

  get typeNames(): string[] {
    console.log(Object.values(UserTypeEnum))
    return Object.values(UserTypeEnum);
  }

  recordForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.createForm();
    console.log(this.record)
  }

  ngOnChanges() {
    if (this.recordForm && this.record) {
      this.recordForm.patchValue(this.record);
    }
  }

  private createForm() {
    if (this.isEdit) {
      this.recordForm = this.formBuilder.group({
        username: [this.record.username, Validators.required],
        first_name: [this.record.first_name, Validators.required],
        last_name: [this.record.last_name, Validators.required],
        email: [this.record.email, [Validators.required, Validators.email]],
        password: [this.record.password, Validators.required],
        repeat_password: [this.record.password ? this.record.password : '', Validators.required],
        user_type: [this.record.user_type, Validators.required],
      });
    } else {
      this.recordForm = this.formBuilder.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        repeat_password: ['', Validators.required],
        user_type: ['', Validators.required],
      });
    }
  }

  onSubmit() {
    if (this.recordForm.valid) {
      this.editRecord.emit(this.recordForm.value);
    }
  }

  closeModal() {
    this.close.emit();
  }

  onEditRecord() {
    if (this.recordForm.valid) {
      const {repeat_password, ...rest} = this.recordForm.value;
      this.editRecord.emit(rest);
    }
  }

  onDeleteRecord() {
    this.deleteRecord.emit(this.record.username);
  }

  onCreateRecord() {
    this.saveRecord.emit(this.recordForm.value);
  }
}
