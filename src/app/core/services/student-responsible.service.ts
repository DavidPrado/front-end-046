import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ResponsavelAlunoResponseDTO } from '../models/student-responsible';

@Injectable({
  providedIn: 'root',
})
export class StudentResponsibleService {
  private http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrlGeneral}/responsavel-alunos`;

  findAll(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }

  findAllStudentResponsible(
    filter: any,
    page: number = 0,
    size: number = 10,
    sortBy: string = 'name',
    direction: string = 'ASC',
  ): Observable<ResponsavelAlunoResponseDTO[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('direction', direction);

    return this.http.get<ResponsavelAlunoResponseDTO[]>(this.API_URL, {
      params,
    });
  }

  deleteStudentResponsibleBatch(ids: string[]): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/batch`, { body: ids });
  }

  delete(id: string): Observable<void>{
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  create(role: any): Observable<ResponsavelAlunoResponseDTO> {
    return this.http.post<ResponsavelAlunoResponseDTO>(`${this.API_URL}`, role);
  }

  update(
    id: string,
    studentResponsible: any,
  ): Observable<ResponsavelAlunoResponseDTO> {
    return this.http.put<ResponsavelAlunoResponseDTO>(
      `${this.API_URL}/${id}`,
      studentResponsible,
    );
  }

  findById(id: string): Observable<ResponsavelAlunoResponseDTO> {
    return this.http.get<ResponsavelAlunoResponseDTO>(`${this.API_URL}/${id}`);
  }

  findByIdStudent(
    idStudent: string,
  ): Observable<ResponsavelAlunoResponseDTO[]> {
    return this.http.get<ResponsavelAlunoResponseDTO[]>(
      `${this.API_URL}/aluno/${idStudent}`,
    );
  }
}
