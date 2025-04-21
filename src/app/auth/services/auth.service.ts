import { inject, Injectable, signal } from '@angular/core';
import { NewUser, User } from '../Interfaces/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ApiResponse, LoginResponse } from '../Interfaces/response';
import { jwtDecode } from 'jwt-decode';
import { CustomJwtPayload } from '../Interfaces/jwtPayload';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private accessTokenKey = 'token';
  private refreshTokenKey = 'refreshToken';
  public isRefreshing = false;
  public refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  fullName = signal<string>("");
  idUser = signal<number>(0);

  login(credentialas: User): Observable<ApiResponse<LoginResponse>> {
    return this.http.post<ApiResponse<LoginResponse>>(`${baseUrl}/Auth/login`, credentialas).pipe(
      map((response) => {
        if (response.success) {
          localStorage.setItem(this.accessTokenKey, response.data.token);
          this.setTokens(response.data.token, response.data.refreshToken);
        }
        return response;
      })
    )
  }

  refreshToken(): Observable<ApiResponse<LoginResponse>> {
    const token = this.getRefreshToken();
    if (!token) {
      return new Observable<ApiResponse<LoginResponse>>(subscriber => {
        subscriber.error({ success: false, message: 'No se encontró el refresh token' });
      });
    }

    const accessToken = this.getToken();
    let idUser = 0;

    if (accessToken) {
      const decoded = jwtDecode<CustomJwtPayload>(accessToken);
      idUser = Number(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
    }

    const getNewToken = {
      id: idUser,
      refreshToken: token,
    };

    return this.http.post<ApiResponse<LoginResponse>>(`${baseUrl}/Auth/validate-refresh-token`, getNewToken).pipe(
      map((response) => {
        if (response.success) {
          this.setTokens(response.data.token, response.data.refreshToken);
        }
        return response;
      })
    );
  }

  register(data: NewUser): Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(`${baseUrl}/Auth/register`, data)
  }

  isLoggedIn = (): boolean => {
    const token = this.getToken();
    if (!token) return false;

    return !this.isTokenExpired(token);
  }

  private isTokenExpired(token: string): boolean {
    if (!token) return true;
    const decoded = jwtDecode<CustomJwtPayload>(token);
    const isTokenExpired = Date.now() >= decoded['exp']! * 1000;
    if (decoded && decoded.exp && Date.now() < decoded.exp * 1000) {
      this.fullName.set(decoded['FullName']);
      this.idUser.set(Number(decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']));
    }
    return isTokenExpired;
  }

  logout(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    this.fullName.set("");
    this.idUser.set(0);
  }

  getToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  setTokens(token: string, refreshToken: string): void {
    localStorage.setItem(this.accessTokenKey, token);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

}
