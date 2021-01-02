import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UrlService } from 'src/app/shared/services/url.service';
import { LogoutComponent } from 'src/app/users/components/logout/logout.component';
import { TokenStorageService } from 'src/app/users/services/token-storage.service';
import { UserService } from 'src/app/users/services/user.service';
import { ExpressionService } from '../../services/expression.service';

@Component({
  selector: 'app-expression-detail',
  templateUrl: './expression-detail.component.html',
  styleUrls: ['./expression-detail.component.scss']
})
export class ExpressionDetailComponent implements OnInit {

  public previousRoute;
  public currentExpression;
  public currentUser;
  public isFavorited: boolean;
  public favoritesArray = [];

  constructor(
    public dialog: MatDialog,
    private urlService: UrlService,
    private route: ActivatedRoute,
    private expressionService: ExpressionService,
    private tokenStorageService: TokenStorageService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const currentUserId = this.tokenStorageService.getUser().id;
    const expressionId = this.route.snapshot.paramMap.get('expressionid');
    this.expressionService.getExpressionById(expressionId)
    .subscribe(
      data => {
        this.currentExpression = data;
        this.userService.getUser(currentUserId)
        .subscribe(
          data => {
            this.currentUser = data;
            if (this.currentUser.favorites !== null && this.currentUser.favorites !== '') {
              this.favoritesArray = this.currentUser.favorites.split(',');
              console.log(this.favoritesArray);
              if (this.favoritesArray.includes(expressionId)) {
                this.isFavorited = true;
              } else {
                this.isFavorited = false;
              }
            } else {
              console.log('there are no favorites');
              this.isFavorited = false;
            }  
          },
          error => {
            console.log(error);
          });
      },
      error => {
        console.log(error);
      });
    // Route back
    this.urlService.previousUrl$.subscribe((previousUrl: string) => {
      this.previousRoute = previousUrl;
    });
  }

  addToFavorites(): void {
    const id = this.currentExpression.id;
    const userFavorites = this.currentUser.favorites;
    let fav = '';
    if (userFavorites != null) {
      fav = userFavorites.concat(',', id);
    } else {
      fav += id;
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

  toggleFromFavorites(): void {
    const id = this.currentExpression.id;
    this.favoritesArray = this.favoritesArray.filter(exp => exp != id);
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
