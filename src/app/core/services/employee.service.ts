import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  FuncionarioRequestDTO,
  FuncionarioResponseDTO,
  Page,
} from '../models/employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private readonly API_URL = `${environment.apiUrlGeneral}/funcionarios`;
  constructor(private http: HttpClient) {}

  findAllEmployee(
    filter: FuncionarioRequestDTO,
    page: number = 0,
    size: number = 10,
    sortBy: string = 'createdAt',
    direction: string = 'DESC',
  ): Observable<Page<FuncionarioResponseDTO>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('direction', direction);

    return this.http.get<Page<FuncionarioResponseDTO>>(this.API_URL, {
      params,
    });
  }

  findAll(): Observable<Page<any>> {
    return this.http.get<Page<any>>(this.API_URL);
  }

  findById(id: string): Observable<FuncionarioResponseDTO> {
    return this.http.get<FuncionarioResponseDTO>(`${this.API_URL}/${id}`);
  }

  create(person: any): Observable<FuncionarioResponseDTO> {
    return this.http.post<FuncionarioResponseDTO>(this.API_URL, person);
  }

  update(id: string, person: any): Observable<FuncionarioResponseDTO> {
    return this.http.put<FuncionarioResponseDTO>(
      `${this.API_URL}/${id}`,
      person,
    );
  }

  deleteEmployeeBatch(ids: string[]): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/batch`, { body: ids });
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  findByIdPerson(IdPerson: string): Observable<FuncionarioResponseDTO> {
    return this.http.get<FuncionarioResponseDTO>(
      `${this.API_URL}/pessoa/${IdPerson}`,
    );
  }

  findByTerm(term: string): Observable<any> {
    const cleanTerm = term.replace(/\D/g, '');
    const isCpf = cleanTerm.length === 11;

    let params = new HttpParams()
      .set('page', '0')
      .set('size', '20')
      .set('sortBy', 'name')
      .set('direction', 'ASC');

    if (isCpf) {
      params = params.set('query', cleanTerm);
      params = params.set('query', term);
    } else {
      params = params.set('query', term);
    }

    return this.http.get<any>(`${this.API_URL}/search`, { params });
  }
}
