import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogoutComponent } from 'src/app/users/components/logout/logout.component';
import { ExpressionService } from '../../services/expression.service';

@Component({
  selector: 'app-expression-list',
  templateUrl: './expression-list.component.html',
  styleUrls: ['./expression-list.component.scss']
})
export class ExpressionListComponent implements OnInit {

  public expressionList;

  constructor(
    private expressionService: ExpressionService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.expressionService.getExpressions()
    .subscribe(
      data => {
        this.expressionList = data;
      },
      error => {
        console.log(error);
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LogoutComponent, {
      width: '250px'
    });
  }

}
