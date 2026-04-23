import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationResponseDTO , Page} from '../models/notification.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private http = inject(HttpClient);
  private readonly API = `${environment.apiUrlGeneral}/notificacao`;

getNotifications(
    page: number = 0,
    size: number = 10,
    filters: {
      recipientId?: string;
      category?: string;
      isRead?: boolean;
      sortBy?: string;
      direction?: 'ASC' | 'DESC';
    } = {}
  ): Observable<Page<NotificationResponseDTO>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (filters.recipientId) params = params.set('recipientId', filters.recipientId);
    if (filters.category) params = params.set('category', filters.category);
    if (filters.isRead !== undefined && filters.isRead !== null) {
      params = params.set('isRead', filters.isRead.toString());
    }
    if (filters.sortBy) params = params.set('sortBy', filters.sortBy);
    if (filters.direction) params = params.set('direction', filters.direction);

    return this.http.get<Page<NotificationResponseDTO>>(this.API, { params });
  }

  markAsRead(id: string): Observable<NotificationResponseDTO> {
    return this.http.patch<NotificationResponseDTO>(
      `${this.API}/${id}/read`,
      {},
    );
  }

  getUnreadCount(recipientId: string): Observable<number> {
    return this.http.get<number>(
      `${this.API}/user/${recipientId}/unread-count`,
    );
  }
}
