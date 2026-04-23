import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AlunoRequestDTO, AlunoResponseDTO } from '../models/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrlGeneral}/alunos`;

  findAll(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }

  findAllStudent(
    filter: AlunoRequestDTO,
    page: number = 0,
    size: number = 10,
    sortBy: string = 'name',
    direction: string = 'ASC',
  ): Observable<AlunoResponseDTO[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('direction', direction);

    if (filter && filter.query) {
      params = params.set('query', filter.query);
    }

    if (filter && filter.idSchool) {
      params = params.set('idSchool', filter.idSchool);
    }

    return this.http.get<AlunoResponseDTO[]>(this.API_URL, { params });
  }

  deleteStudentBatch(ids: string[]): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/batch`, { body: ids });
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
  create(role: any): Observable<AlunoResponseDTO> {
    return this.http.post<AlunoResponseDTO>(`${this.API_URL}`, role);
  }

  update(id: string, student: any): Observable<AlunoResponseDTO> {
    return this.http.put<AlunoResponseDTO>(`${this.API_URL}/${id}`, student);
  }

  findById(id: string): Observable<AlunoResponseDTO> {
    return this.http.get<AlunoResponseDTO>(`${this.API_URL}/${id}`);
  }

  findByIdPerson(IdPerson: string): Observable<AlunoResponseDTO> {
    return this.http.get<AlunoResponseDTO>(
      `${this.API_URL}/pessoa/${IdPerson}`,
    );
  }
}
