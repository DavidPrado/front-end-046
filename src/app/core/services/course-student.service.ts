import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CursoAlunoResponseDTO } from '../models/course-student.model';

@Injectable({
  providedIn: 'root',
})
export class CourseStudentService {
  private http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrlGeneral}/cursoalunos`;

  findAll(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }

  findAllCourseStudent(
    filter: any,
    page: number = 0,
    size: number = 10,
    sortBy: string = 'name',
    direction: string = 'ASC',
  ): Observable<CursoAlunoResponseDTO[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('direction', direction);

    return this.http.get<CursoAlunoResponseDTO[]>(this.API_URL, { params });
  }

  deleteStudentBatch(ids: string[]): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/batch`, { body: ids });
  }

  create(role: any): Observable<CursoAlunoResponseDTO> {
    return this.http.post<CursoAlunoResponseDTO>(`${this.API_URL}`, role);
  }

  update(id: string, courseStudent: any): Observable<CursoAlunoResponseDTO> {
    return this.http.put<CursoAlunoResponseDTO>(
      `${this.API_URL}/${id}`,
      courseStudent,
    );
  }

  findById(id: string): Observable<CursoAlunoResponseDTO> {
    return this.http.get<CursoAlunoResponseDTO>(`${this.API_URL}/${id}`);
  }

  findByIdStudent(idStudent: string): Observable<CursoAlunoResponseDTO[]> {
    return this.http.get<CursoAlunoResponseDTO[]>(`${this.API_URL}/aluno/${idStudent}`);
  }
}
