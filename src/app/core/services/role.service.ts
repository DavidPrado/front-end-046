import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RoleResponseDTO } from '../models/role.model';

@Injectable({ 
  providedIn: 'root' 
})
export class RoleService {
  private http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/roles`;

  findAll(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }

  findAllRoles(
    filter: any,
    page: number = 0,
    size: number = 10,
    sortBy: string = 'name',
    direction: string = 'ASC',
  ): Observable<RoleResponseDTO[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('direction', direction);

    if (filter.name) params = params.set('name', filter.name);
    if (filter.description)
      params = params.set('description', filter.description);

    return this.http.get<RoleResponseDTO[]>(this.API_URL, { params });
  }

  deleteRoleBatch(ids: string[]): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/batch`, { body: ids });
  }

  create(role: any): Observable<RoleResponseDTO> {
    return this.http.post<RoleResponseDTO>(`${this.API_URL}`, role);
  }

  update(id: string, role: any): Observable<RoleResponseDTO> {
    return this.http.put<RoleResponseDTO>(`${this.API_URL}/${id}`, role);
  }

  findById(id: string): Observable<RoleResponseDTO> {
    return this.http.get<RoleResponseDTO>(`${this.API_URL}/${id}`);
  }
}
