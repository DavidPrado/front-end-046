import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatriculaCompletaDTO } from '../models/matricula.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MatriculaService {

  constructor(private http: HttpClient) {}

  private readonly API_URL = `${environment.apiUrlGeneral}/matriculas`;

  enviarMatricula(dados: MatriculaCompletaDTO): Observable<void> {
    return this.http.post<void>(`${this.API_URL}`, dados);
  }
}
