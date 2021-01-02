import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'http://fraseology-app.herokuapp.com/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(data): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      email: data.value.email,
      password: data.value.password
    }, httpOptions)
  }

  signup(user): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      name: user.name,
      email: user.email,
      password: user.password
    }, httpOptions);
  }

  requestResetPassword(emailObj): Observable<any> {
    return this.http.post(AUTH_API + 'forgot-password', {
      email: emailObj.email
    });
  }

  resetPassword(passwordObj): Observable<any> {
    return this.http.put(AUTH_API + 'reset-password', {
      password: passwordObj.password,
      user: passwordObj.user
    })
  }
}
