import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  EstagioResponseDTO,
  EstagioRequestListDTO,
  Page,
} from '../models/internship.model';

@Injectable({
  providedIn: 'root',
})
export class InternshipService {
  private readonly API_URL = `${environment.apiUrlGeneral}/estagios`;

  constructor(private http: HttpClient) {}

  findAllEstagiosView(
    filter: EstagioRequestListDTO,
    page: number = 0,
    size: number = 10,
    sortBy: string = 'createdAt',
    direction: string = 'DESC',
  ): Observable<Page<EstagioResponseDTO>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('direction', direction);

    if (filter.studentName)
      params = params.set('studentName', filter.studentName);
    if (filter.studentCpf) params = params.set('studentCpf', filter.studentCpf);
    if (filter.enterpriseName)
      params = params.set('enterpriseName', filter.enterpriseName);
    if (filter.enterpriseCnpj)
      params = params.set('enterpriseCnpj', filter.enterpriseCnpj);
    if (filter.startDate) params = params.set('startDate', filter.startDate);
    if (filter.endDate) params = params.set('startDate', filter.endDate);
    if (filter.terminationContract)
      params = params.set('terminationContract', filter.terminationContract);
    if (filter.vencimento30Dias !== undefined) {
      params = params.set(
        'vencimento30Dias',
        filter.vencimento30Dias.toString(),
      );
    }

    return this.http.get<Page<EstagioResponseDTO>>(`${this.API_URL}/view`, {
      params,
    });
  }

  findAll(): Observable<Page<any>> {
    return this.http.get<Page<any>>(`${this.API_URL}/view`);
  }

  findById(id: string): Observable<EstagioResponseDTO> {
    return this.http.get<EstagioResponseDTO>(`${this.API_URL}/${id}`);
  }

  create(person: any): Observable<EstagioResponseDTO> {
    return this.http.post<EstagioResponseDTO>(this.API_URL, person);
  }

  update(id: string, person: any): Observable<EstagioResponseDTO> {
    return this.http.put<EstagioResponseDTO>(`${this.API_URL}/${id}`, person);
  }

  deleteInternshipBatch(ids: string[]): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/batch`, { body: ids });
  }
}
