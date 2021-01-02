import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/helpers/auth.guard';
import { SubjectDetailComponent } from './components/subject-detail/subject-detail.component';
import { SubjectListComponent } from './components/subject-list/subject-list.component';

const routes: Routes = [
  {
    path: 'subjects',
    component: SubjectListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'subjects/:subjectid',
    component: SubjectDetailComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule { }
