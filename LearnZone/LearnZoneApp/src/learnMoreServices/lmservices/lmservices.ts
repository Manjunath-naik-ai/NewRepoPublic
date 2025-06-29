import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';  

@Injectable({
  providedIn: 'root'
})
export class Lmservices {

  constructor(private http: HttpClient) { }


  Login(username: string, password: string): Observable<number> {
    const apiUrl = 'https://localhost:7158/api/LearnMoreServices/Login?username=yourUsername&password=yourPassword'; // Update with your backend URL if needed
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.get<number>(apiUrl, { params });
  }

  Register(name: string, email: string, passwordHash: string): Observable<number> {
    const apiUrl = 'https://localhost:7158/api/LearnMoreServices/register'; // Update with your backend URL if needed
    const params = new HttpParams()
      .set('name', name)
      .set('email', email)
      .set('passwordHash', passwordHash);

    return this.http.post<number>(apiUrl, null, { params });
  }

}
