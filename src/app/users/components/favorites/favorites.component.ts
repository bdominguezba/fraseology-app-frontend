import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExpressionService } from 'src/app/expressions/services/expression.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { UserService } from '../../services/user.service';
import { LogoutComponent } from '../logout/logout.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  public currentUser;
  public favoritesArray;
  public expressionsArray = [];

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private tokenStorageService: TokenStorageService,
    private expressionService: ExpressionService
  ) { }

  ngOnInit(): void {
    const currentUserId = this.tokenStorageService.getUser().id;
    this.userService.getUser(currentUserId)
        .subscribe(
          data => {
            this.currentUser = data;
            this.favoritesArray = this.currentUser.favorites.split(',');
            this.favoritesArray.forEach(fav => {
              this.expressionService.getExpressionById(fav)
              .subscribe(
                data => {
                  this.expressionsArray.push(data);
                },
                error => {
                  console.log(error);
                });
            })
          },
          error => {
            console.log(error);
          });
  }

  toggleFromFavorites(expressionId): void {
    this.favoritesArray = this.favoritesArray.filter(exp => exp != expressionId);
    let fav;
    if (this.favoritesArray.length == 0) {
      fav = null;
    } else {
      fav = this.favoritesArray.join();
    }
    this.userService.updateFavorites({
      favorites: fav,
      id: this.currentUser.id
    })
    .subscribe(
      data => {
        this.currentUser = data;
        window.location.reload();
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

}
