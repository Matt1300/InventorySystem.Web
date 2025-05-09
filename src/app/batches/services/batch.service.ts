import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/auth/Interfaces/response';
import { CreateBatch, GetBatches, UpdateBatch } from '../interfaces/Batch';

const baseUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class BatchService {

  http = inject(HttpClient);

  getBatches(): Observable<ApiResponse<GetBatches[]>> {
    return this.http.get<ApiResponse<GetBatches[]>>(`${baseUrl}/Batch`);
  }

  updateBatch(id: number, batch: UpdateBatch): Observable<ApiResponse<GetBatches>> {
    return this.http.patch<ApiResponse<GetBatches>>(`${baseUrl}/Batch/${id}`, batch);
  }

  deleteBatch(id: number): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(`${baseUrl}/Batch/${id}`);
  }

  createBatch(batch: CreateBatch): Observable<ApiResponse<GetBatches>> {
    return this.http.post<ApiResponse<GetBatches>>(`${baseUrl}/Batch`, batch);
  }

  lowStockProducts(): Observable<ApiResponse<number>> {
    return this.http.get<ApiResponse<number>>(`${baseUrl}/Batch/lowStock`);
  }
}
