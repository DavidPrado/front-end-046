export interface CursoRequestDTO {
  name?: string;
  description?: string;
  active?: boolean | null;
}

export interface CursoResponseDTO {
  id?: string;        
  name?: string;
  description?: string;
  active?: boolean | null;
}
export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}