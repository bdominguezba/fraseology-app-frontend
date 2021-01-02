import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LogoutComponent } from 'src/app/users/components/logout/logout.component';
import { TokenStorageService } from 'src/app/users/services/token-storage.service';
import { UserService } from 'src/app/users/services/user.service';
import { ExpressionService } from '../../services/expression.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public searchTerm: string;
  public activeSearch = false;
  public searchResult;
  public totalExpressions;
  public randomExpression;
  public currentUser;
  public currentUserId;

  constructor(
    public dialog: MatDialog,
    private expressionService: ExpressionService,
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.currentUserId = this.tokenStorageService.getUser().id;
    this.userService.getUser(this.currentUserId)
    .subscribe(
      data => {
        this.currentUser = data;
        if (this.currentUser.accept_notifications) {
          this.getRandomExpression();
          this.openSnackBar('La frase del día', 'Descubrir');
        }
      },
      error => {
        console.log(error);
      });
    
  }

  search(): void {
    this.activeSearch = true;
    this.expressionService.findExpression(this.searchTerm)
    .subscribe(
      data => {
        this.searchResult = data;
        console.log(data);
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

  getRandomExpression(): void {
    this.expressionService.getExpressions()
    .subscribe(
      data => {
        this.totalExpressions = data.length;
        this.randomExpression = Math.floor(Math.random() * this.totalExpressions);
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

  openSnackBar(message: string, action: string) {
    let snackBarRef = this._snackBar.open(message, action, {duration: 10000});
    snackBarRef.onAction().subscribe(() => {
      this.router.navigate([`/expressions/${this.randomExpression}`])
    })
  }

}
