import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'https://fraseology-app.herokuapp.com/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public acceptNotification: boolean;

  constructor(private http: HttpClient) { }

  getUser(id): Observable<any> {
    return this.http.get(API_URL + '/' + id);
  }

  updateProfile(dataObj): Observable<any> {
    console.log('llama al server');
    console.log(dataObj);
    return this.http.put(API_URL + '/profile', {
      id: dataObj.id,
      name: dataObj.name,
      surname: dataObj.surname,
      birthdate: dataObj.birthdate,
      email: dataObj.email
    });
  }

  changeNotificationPreference(preferenceObj): Observable<any> {
    return this.http.put(API_URL + '/update-settings', {
      accept_notifications: preferenceObj.accept_notifications,
      userId: preferenceObj.userId
    });
  }

  updateFavorites(favObj): Observable<any> {
    return this.http.put(API_URL + '/favorites', {
      favorites: favObj.favorites,
      id: favObj.id
    })
  }
}
