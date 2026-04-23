export interface CargoEmpresaRequestDTO {
  position?: string;
  description?: string;
  active?: boolean | null; 
}

export interface CargoEmpresaResponseDTO {
  id?: string; 
  position?: string;
  description?: string;
  active?: boolean;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}