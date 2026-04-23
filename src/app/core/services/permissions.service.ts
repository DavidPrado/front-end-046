import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Permission } from '../models/permission.model';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  constructor() {}

  private http = inject(HttpClient);

  private readonly API_URL = `${environment.apiUrl}/permissions`;

  getPermissions(
    name: string = '',
    page: number = 0,
    size: number = 20,
  ): Observable<Permission[]> {
    const params = new HttpParams()
      .set('name', name)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Permission[]>(`${this.API_URL}`, {
      params,
    });
  }
}
