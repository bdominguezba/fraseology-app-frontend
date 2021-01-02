import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./users/user.module').then(m => m.UserModule)
  },
  {
    path: '',
    loadChildren: () => import('./expressions/expressions.module').then(m => m.ExpressionsModule)
  },
  {
    path: '',
    loadChildren: () => import('./subjects/subject.module').then(m => m.SubjectModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
