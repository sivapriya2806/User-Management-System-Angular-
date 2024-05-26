import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'https://dummy.restapiexample.com/api/v1/employees';
  apiUrlPost = 'https://dummy.restapiexample.com/api/v1/create';

  constructor(private http: HttpClient) {}

  getUser(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  addUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrlPost, user);
  }
}
