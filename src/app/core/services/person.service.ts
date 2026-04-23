import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  PersonRequestDTO,
  PersonResponseDTO,
  Page,
} from '../models/person.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private readonly API_URL = `${environment.apiUrlGeneral}/pessoas`;
  constructor(private http: HttpClient) {}

  findAllPersons(
    filter: PersonRequestDTO,
    page: number = 0,
    size: number = 10,
    sortBy: string = 'createdAt',
    direction: string = 'DESC',
  ): Observable<Page<PersonResponseDTO>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('direction', direction);

    if (filter.name) params = params.set('name', filter.name);
    if (filter.rg) params = params.set('rg', filter.rg);
    if (filter.cpf) params = params.set('cpf', filter.cpf);
    if (filter.email) params = params.set('email', filter.email);
    if (filter.dateOfBirth)
      params = params.set('birthDate', filter.dateOfBirth.toString());
    if (filter.phoneHome) params = params.set('phoneHome', filter.phoneHome);
    if (filter.phoneMobile)
      params = params.set('phoneMobile', filter.phoneMobile);
    if (filter.phoneWork) params = params.set('phoneWork', filter.phoneWork);
    if (filter.uf) params = params.set('uf', filter.uf);
    if (filter.city) params = params.set('city', filter.city);
    if (filter.neighborhood)
      params = params.set('neighborhood', filter.neighborhood);
    if (filter.street) params = params.set('street', filter.street);
    if (filter.number) params = params.set('number', filter.number);
    if (filter.complement) params = params.set('complement', filter.complement);

    return this.http.get<Page<PersonResponseDTO>>(this.API_URL, { params });
  }

  findAll(): Observable<Page<any>> {
    return this.http.get<Page<any>>(this.API_URL);
  }

  findById(id: string): Observable<PersonResponseDTO> {
    return this.http.get<PersonResponseDTO>(`${this.API_URL}/${id}`);
  }

  create(person: any): Observable<PersonResponseDTO> {
    return this.http.post<PersonResponseDTO>(this.API_URL, person);
  }

  update(id: string, person: any): Observable<PersonResponseDTO> {
    return this.http.put<PersonResponseDTO>(`${this.API_URL}/${id}`, person);
  }

  deletePersonBatch(ids: string[]): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/batch`, { body: ids });
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
      params = params.set('cpf', cleanTerm);
      params = params.set('name', term);
    } else {
      params = params.set('name', term);
    }

    return this.http.get<any>(`${this.API_URL}`, { params });
  }
}
