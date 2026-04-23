export interface CursoAlunoRequestDTO {
  idStudent?: string;
  idCourse?: string;
}

export interface CursoAlunoResponseDTO {
  id?: string;
  idStudent?: string;
  idCourse?: string;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}