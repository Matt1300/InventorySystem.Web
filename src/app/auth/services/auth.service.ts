import { inject, Injectable } from '@angular/core';
import { User } from '../Interfaces/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';
import { LoginResponse } from '../Interfaces/login-response';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private tokenKey = 'token';


  constructor() { }


  login(credentialas: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${baseUrl}/Auth/login`, credentialas).pipe(
      map((response) => {
        if (response.success) {
          localStorage.setItem(this.tokenKey, response.data.token);
        }
        return response;
      })
    )
  }

  register(data: User) {
    return this.http.post(`${baseUrl}/Auth/register`, data);
  }


}
