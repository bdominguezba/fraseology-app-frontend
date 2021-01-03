import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'https://fraseology-app.herokuapp.com/subjects';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  getSubjects(): Observable<any> {
    return this.http.get(API_URL);
  }

  getSubjectById(id): Observable<any> {
    return this.http.get(API_URL + '/' + id);
  }

  getExpressionsBySubject(subjectId): Observable<any> {
    return this.http.get(API_URL + '/' + subjectId + '/expressions');
  }
}
