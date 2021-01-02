import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/helpers/auth.guard';
import { SubjectDetailComponent } from '../subjects/components/subject-detail/subject-detail.component';
import { SubjectListComponent } from '../subjects/components/subject-list/subject-list.component';
import { ExpressionDetailComponent } from './components/expression-detail/expression-detail.component';
import { ExpressionListComponent } from './components/expression-list/expression-list.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'expressions',
    component: ExpressionListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'expressions/:expressionid',
    component: ExpressionDetailComponent,
    canActivate: [AuthGuard]
  },
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
export class ExpressionsRoutingModule { }
