import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstagioDescArquivoResponseDTO } from '../models/internship-desc-file.model';
import { UploadResponseDTO } from '../models/upload-response.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InternshipFileService {
  private http = inject(HttpClient);
  private readonly APIArq = `${environment.apiUrlGeneral}/estagios-arquivos`;
  private readonly APIDesc = `${environment.apiUrlGeneral}/estagios-desc-arquivos`;

  upload(
    idInternship: string,
    description: string,
    files: File[],
  ): Observable<UploadResponseDTO[]> {
    const formData = new FormData();
    formData.append('description', description);

    files.forEach((file) => {
      formData.append('files', file);
    });

    return this.http.post<UploadResponseDTO[]>(`${this.APIArq}/${idInternship}/files`, formData);
  }

  getFilesByInternship(
    internshipId: string,
  ): Observable<EstagioDescArquivoResponseDTO[]> {
    return this.http.get<EstagioDescArquivoResponseDTO[]>(
      `${this.APIDesc}/estagio/${internshipId}`,
    );
  }

  download(fileId: string): Observable<Blob> {
    return this.http.get(`${this.APIArq}/${fileId}/download`, {
      responseType: 'blob',
    });
  }

  delete(fileId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.APIArq}/${fileId}`,
    );
  }
}
