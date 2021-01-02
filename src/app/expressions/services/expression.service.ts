import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://fraseology-app.herokuapp.com/expressions';

@Injectable({
  providedIn: 'root'
})
export class ExpressionService {

  constructor(private http: HttpClient) { }

  getExpressions(): Observable<any> {
    return this.http.get(API_URL);
  }

  getExpressionById(id): Observable<any> {
    return this.http.get(API_URL + '/' + id);
  }

  findExpression(searchTerm): Observable<any> {
    return this.http.get(API_URL + '?searchTerm=' + searchTerm);
  }
}
