import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  CargoEmpresaRequestDTO,
  CargoEmpresaResponseDTO,
  Page
} from '../models/position-enterprise.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PositionEnterpriseService {
  private readonly API_URL = `${environment.apiUrlGeneral}/cargos`;
  constructor(private http: HttpClient) {}

  findAllPersons(
    filter: CargoEmpresaRequestDTO,
    page: number = 0,
    size: number = 10,
    sortBy: string = 'createdAt',
    direction: string = 'DESC',
  ): Observable<Page<CargoEmpresaResponseDTO>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('direction', direction);

    if (filter.position) params = params.set('position', filter.position);
    if (filter.description)
      params = params.set('description', filter.description);
    if (filter.active !== null && filter.active !== undefined) {
      params = params.set('active', filter.active.toString());
    }

    return this.http.get<Page<CargoEmpresaResponseDTO>>(this.API_URL, { params });
  }

  findById(id: string): Observable<CargoEmpresaResponseDTO> {
    return this.http.get<CargoEmpresaResponseDTO>(`${this.API_URL}/${id}`);
  }

  create(positionEnterprise: any): Observable<CargoEmpresaResponseDTO> {
    return this.http.post<CargoEmpresaResponseDTO>(
      this.API_URL,
      positionEnterprise,
    );
  }

  update(
    id: string,
    positionEnterprise: any,
  ): Observable<CargoEmpresaResponseDTO> {
    return this.http.put<CargoEmpresaResponseDTO>(
      `${this.API_URL}/${id}`,
      positionEnterprise,
    );
  }

  deletePersonBatch(ids: string[]): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/batch`, { body: ids });
  }

  findByTerm(term: string): Observable<any> {

    let params = new HttpParams()
      .set('page', '0')
      .set('size', '20')
      .set('sortBy', 'position')
      .set('direction', 'ASC');

    params = params.set('position', term);
   
    return this.http.get<any>(`${this.API_URL}`, { params });
  }
}
