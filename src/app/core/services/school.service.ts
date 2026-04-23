import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EscolaRequestDTO, EscolaResponseDTO } from '../models/school.model';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  private readonly API_URL = `${environment.apiUrlGeneral}/escolas`;

  constructor(private http: HttpClient) {}

  findAllSchools(
    filter: EscolaRequestDTO,
    page: number = 0,
    size: number = 10,
    sortBy: string = 'createdAt',
    direction: string = 'DESC',
  ): Observable<EscolaResponseDTO[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('direction', direction);

    if (filter.name) params = params.set('name', filter.name);
    if (filter.email) params = params.set('email', filter.email);
    if (filter.uf) params = params.set('uf', filter.uf);
    if (filter.city) params = params.set('city', filter.city);
    if (filter.neighborhood)
      params = params.set('neighborhood', filter.neighborhood);
    if (filter.street) params = params.set('street', filter.street);
    if (filter.number) params = params.set('number', filter.number);
    if (filter.complement) params = params.set('complement', filter.complement);
    if (filter.code) params = params.set('code', filter.code);
    if (filter.phone) params = params.set('phone', filter.phone);

    return this.http.get<EscolaResponseDTO[]>(this.API_URL, { params });
  }
    
  findAll(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }

  findById(id: string): Observable<EscolaResponseDTO> {
    return this.http.get<EscolaResponseDTO>(`${this.API_URL}/${id}`);
  }

  create(enterprise: any): Observable<EscolaResponseDTO> {
    return this.http.post<EscolaResponseDTO>(this.API_URL, enterprise);
  }

  update(id: string, enterprise: any): Observable<EscolaResponseDTO> {
    return this.http.put<EscolaResponseDTO>(
      `${this.API_URL}/${id}`,
      enterprise,
    );
  }

  deleteSchoolBatch(ids: string[]): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/batch`, { body: ids });
  }
}
