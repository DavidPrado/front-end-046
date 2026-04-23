import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import {
  UserListResponseDTO,
  UserListRequestDTO,
  UserResponseDTO,
} from '../models/user.model';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL = `${environment.apiUrl}/users`;
  private currentUserSubject = new BehaviorSubject<UserResponseDTO | null>(
    null,
  );
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  findAllUsers(
    filter: UserListRequestDTO,
    page: number = 0,
    size: number = 10,
    sortBy: string = 'createdAt',
    direction: string = 'DESC',
  ): Observable<UserListResponseDTO[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('direction', direction);

    // Mapeamento de todos os campos do seu DTO Java
    if (filter.code) params = params.set('code', filter.code.toString());
    if (filter.name) params = params.set('name', filter.name);
    if (filter.email) params = params.set('email', filter.email);
    if (filter.cpf) params = params.set('cpf', filter.cpf);
    if (filter.phoneNumber)
      params = params.set('phoneNumber', filter.phoneNumber);
    if (filter.birthDate)
      params = params.set('birthDate', filter.birthDate.toString());

    // Para booleanos, verificamos se não é null ou undefined
    if (filter.active !== null && filter.active !== undefined) {
      params = params.set('active', filter.active.toString());
    }
    if (
      filter.mustChangePassword !== null &&
      filter.mustChangePassword !== undefined
    ) {
      params = params.set(
        'mustChangePassword',
        filter.mustChangePassword.toString(),
      );
    }

    return this.http.get<UserListResponseDTO[]>(this.API_URL, { params });
  }

  findById(id: string): Observable<UserListResponseDTO> {
    return this.http.get<UserListResponseDTO>(`${this.API_URL}/${id}`);
  }

  create(user: any): Observable<UserListResponseDTO> {
    return this.http.post<UserListResponseDTO>(this.API_URL, user);
  }

  update(id: string, user: any): Observable<UserListResponseDTO> {
    return this.http.put<UserListResponseDTO>(`${this.API_URL}/${id}`, user);
  }

  deleteUsersBatch(ids: string[]): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/batch`, { body: ids });
  }

  getUserRoles(
    userId: string,
    page: number = 0,
    size: number = 10,
  ): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<any>(`${this.API_URL}/${userId}/roles`, { params });
  }

  updateUserRoles(userId: string, roleIds: string[]): Observable<void> {
    return this.http.put<void>(`${this.API_URL}/${userId}/roles`, roleIds);
  }

  fetchCurrentUser(): Observable<UserResponseDTO> {
    return this.http.get<UserResponseDTO>(`${this.API_URL}/me`).pipe(
      tap((user) => {
        if (user.id) {
          localStorage.setItem('user_id', user.id);
          this.currentUserSubject.next(user); // Atualiza o estado da aplicação
        }
      }),
    );
  }

  getCurrentUserValue(): UserResponseDTO | null {
    return this.currentUserSubject.value;
  }
}
