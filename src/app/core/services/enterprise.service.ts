import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  EmpresaRequestDTO,
  EmpresaResponseDTO,
  Page,
} from '../models/enterprise.model';

@Injectable({
  providedIn: 'root',
})
export class EnterpriseService {
  private readonly API_URL = `${environment.apiUrlGeneral}/empresas`;

  constructor(private http: HttpClient) {}

  findAllEnterprises(
    filter: EmpresaRequestDTO,
    page: number = 0,
    size: number = 10,
    sortBy: string = 'createdAt',
    direction: string = 'DESC',
  ): Observable<Page<EmpresaResponseDTO>> {
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
    if (filter.cnpj) params = params.set('cnpj', filter.cnpj);
    if (filter.phone) params = params.set('cnpj', filter.phone);
    if (filter.cep) params = params.set('cep', filter.cep);
    if (filter.stateRegistration)
      params = params.set('stateRegistration', filter.stateRegistration);
    if (filter.municipalRegistration)
      params = params.set(
        'municipalRegistration',
        filter.municipalRegistration,
      );
    if (filter.corporateName)
      params = params.set('corporateName', filter.corporateName);
    if (filter.fantasyName)
      params = params.set('fantasyName', filter.fantasyName);
    if (filter.cnae) params = params.set('cnae', filter.cnae);

    return this.http.get<Page<EmpresaResponseDTO>>(this.API_URL, { params });
  }

  findById(id: string): Observable<EmpresaResponseDTO> {
    return this.http.get<EmpresaResponseDTO>(`${this.API_URL}/${id}`);
  }

  create(enterprise: any): Observable<EmpresaResponseDTO> {
    return this.http.post<EmpresaResponseDTO>(this.API_URL, enterprise);
  }

  update(id: string, enterprise: any): Observable<EmpresaResponseDTO> {
    return this.http.put<EmpresaResponseDTO>(
      `${this.API_URL}/${id}`,
      enterprise,
    );
  }

  deleteEnterpriseBatch(ids: string[]): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/batch`, { body: ids });
  }

  findByTerm(term: string): Observable<any> {
    
    let params = new HttpParams()
      .set('page', '0')
      .set('size', '20')
      .set('sortBy', 'name')
      .set('direction', 'ASC');

    params = params.set('name', term);

    return this.http.get<any>(`${this.API_URL}`, { params });
  }
}
