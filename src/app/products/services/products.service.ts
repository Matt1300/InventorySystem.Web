import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { ApiResponse } from 'src/app/auth/Interfaces/response';
import { Product } from '../interfaces/Product';
import { Observable } from 'rxjs';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  http = inject(HttpClient);

  getProducts(): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(`${baseUrl}/Product`);
  }

}
