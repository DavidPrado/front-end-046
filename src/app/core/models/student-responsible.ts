export interface ResponsavelAlunoRequestDTO {
  idStudent?: string;
  idPerson?: string;
  kinship?: string;
}

export interface ResponsavelAlunoResponseDTO {
  id?: String;
  idStudent?: string;
  idPerson?: string;
  kinship?: string;
}


export interface ResponsavelVinculoDTO {
  id?: string;
  idPerson: string;
  kinship: string;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}