export enum NotificationCategory {
    INFO = 'INFO',
    SUCCESS = 'SUCCESS',
    WARNING = 'WARNING',
    ERROR = 'ERROR',
    URGENT = 'URGENT'
}

export interface NotificationResponseDTO {
  id: string;
  title: string;
  message: string;
  category: NotificationCategory;
  actionUrl?: string;
  recipientId?: string; 
  isRead: boolean;
  createdAt: string;
  isGlobal: boolean;   
  systemRule?: string;  
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  last: boolean;      
  first: boolean;
  size: number;
  number: number;
}