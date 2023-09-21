import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotFoundComponent} from "./not-found/not-found.component";
import {ForbiddenComponent} from "./forbidden/forbidden.component";

const routes: Routes = [
  { path: '', redirectTo: 'records', pathMatch: 'full' },
  { path: 'records', loadChildren: () => import('./records/records.module').then(m => m.RecordsModule) },
  { path: '**', component: NotFoundComponent },
  { path: 'forbidden', component: ForbiddenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
