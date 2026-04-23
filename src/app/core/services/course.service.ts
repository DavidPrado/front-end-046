import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CursoRequestDTO, CursoResponseDTO, Page } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private readonly API_URL = `${environment.apiUrlGeneral}/cursos`;
  constructor(private http: HttpClient) {}

  findAllCourses(
    filter: CursoRequestDTO,
    page: number = 0,
    size: number = 10,
    sortBy: string = 'createdAt',
    direction: string = 'DESC',
  ): Observable<Page<CursoResponseDTO>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('direction', direction);

    if (filter.name) params = params.set('name', filter.name);
    if (filter.description)
      params = params.set('description', filter.description);

    if (filter.active !== null && filter.active !== undefined) {
      params = params.set('active', filter.active.toString());
    }

    return this.http.get<Page<CursoResponseDTO>>(this.API_URL, { params });
  }

  findAll(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }

  findById(id: string): Observable<CursoResponseDTO> {
    return this.http.get<CursoResponseDTO>(`${this.API_URL}/${id}`);
  }

  create(courses: any): Observable<CursoResponseDTO> {
    return this.http.post<CursoResponseDTO>(this.API_URL, courses);
  }

  update(id: string, courses: any): Observable<CursoResponseDTO> {
    return this.http.put<CursoResponseDTO>(`${this.API_URL}/${id}`, courses);
  }

  deleteCourseBatch(ids: string[]): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/batch`, { body: ids });
  }
}
