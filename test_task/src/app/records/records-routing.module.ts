import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {RecordsComponent} from "./records.component";

const routes: Routes = [
  { path: '', component: RecordsComponent }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecordsRoutingModule {
}
