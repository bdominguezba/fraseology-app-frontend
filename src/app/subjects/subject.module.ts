import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectListComponent } from './components/subject-list/subject-list.component';
import { SubjectDetailComponent } from './components/subject-detail/subject-detail.component';
import { SubjectRoutingModule } from './subject-routing.module';

// Angular Material imports
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [SubjectListComponent, SubjectDetailComponent],
  imports: [
    CommonModule,
    SubjectRoutingModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule
  ]
})
export class SubjectModule { }
