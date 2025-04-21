import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { ApiResponse } from 'src/app/auth/Interfaces/response';
import { Product, ProductDetails, UpdateProduct, UpdateResponse } from '../interfaces/Product';
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

  getProductById(id: number): Observable<ApiResponse<ProductDetails>> {
    return this.http.get<ApiResponse<ProductDetails>>(`${baseUrl}/Product/${id}`);
  }

  updateProduct(id: number, product: UpdateResponse): Observable<ApiResponse<UpdateProduct>> {
    return this.http.patch<ApiResponse<UpdateResponse>>(`${baseUrl}/Product/${id}`, product);
  }

  deleteProduct(id: number): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(`${baseUrl}/Product/${id}`);
  }

  addProduct(product: Product): Observable<ApiResponse<Product>> {
    return this.http.post<ApiResponse<Product>>(`${baseUrl}/Product`, product);
  }

}
