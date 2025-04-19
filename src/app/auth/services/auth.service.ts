import { inject, Injectable, signal } from '@angular/core';
import { NewUser, User } from '../Interfaces/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';
import { ApiResponse, LoginResponse } from '../Interfaces/response';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private tokenKey = 'token';

  constructor() { }


  login(credentialas: User): Observable<ApiResponse<LoginResponse>> {
    return this.http.post<ApiResponse<LoginResponse>>(`${baseUrl}/Auth/login`, credentialas).pipe(
      map((response) => {
        if (response.success) {
          localStorage.setItem(this.tokenKey, response.data.token);
        }
        return response;
      })
    )
  }

  register(data: NewUser): Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(`${baseUrl}/Auth/register`, data)
  }


}
