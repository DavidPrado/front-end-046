export interface AlunoRequestDTO{
    idPerson?: string;
    idSchool?: string;
    query?: string;
} 

export interface AlunoResponseDTO{
    id?: string;
    idPerson?: string;
    idSchool?: string;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}