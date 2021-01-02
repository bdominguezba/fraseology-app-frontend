import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpressionsRoutingModule } from './expressions-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExpressionDetailComponent } from './components/expression-detail/expression-detail.component';
import { ExpressionListComponent } from './components/expression-list/expression-list.component';
import { HomeComponent } from './components/home/home.component';

// Angular Material imports
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [ExpressionDetailComponent, ExpressionListComponent, HomeComponent],
  imports: [
    CommonModule,
    ExpressionsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
    MatCardModule,
    MatSnackBarModule
  ],
  exports: [HomeComponent]
})
export class ExpressionsModule { }
