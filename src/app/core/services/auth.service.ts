import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/auth.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  private http = inject(HttpClient);

  private readonly API_URL = `${environment.apiUrl}/auth`;

  currentUser = signal<LoginResponse | null>(null);

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, data).pipe(
      tap((response) => {
        localStorage.setItem('auth_token', response.token);
        this.currentUser.set(response);
      }),
    );
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.currentUser.set(null);
  }

  forgotPassword(email: string): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/forgot-password`, { email });
  }

resetPassword(payload: any): Observable<string> {
  return this.http.post(`${this.API_URL}/reset-password`, payload, { 
    responseType: 'text' 
  });
}
}
