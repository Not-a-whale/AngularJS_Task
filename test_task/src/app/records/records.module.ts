import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordsComponent } from './records.component';
import {RecordsRoutingModule} from "./records-routing.module";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {RecordsListComponent} from "./records-list/records-list.component";
import { RecordEditComponent } from './record-edit/record-edit.component';
import {ReactiveFormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {PasswordCheckDirective} from "../directives/password-check.directive";
import {MessageModule} from "primeng/message";
import {ToastModule} from "primeng/toast";
import {PasswordMatchDirective} from "../directives/password-match.directive";



@NgModule({
  declarations: [
    RecordsComponent,
    RecordsListComponent,
    RecordsListComponent,
    RecordEditComponent,
    PasswordCheckDirective,
    PasswordMatchDirective
  ],
  imports: [
    CommonModule,
    RecordsRoutingModule,
    CardModule,
    MessageModule,
    ButtonModule,
    TableModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    PasswordModule,
    ToastModule,
  ],
  exports: [
    PasswordCheckDirective,
    PasswordMatchDirective
  ]
})
export class RecordsModule {
  constructor() {
    console.log('asfasfas')
  }
}
