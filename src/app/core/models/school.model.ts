// escola.model.ts
export interface EscolaRequestDTO {
  code?: string;
  name?: string;
  email?: string | null;
  phone?: string | null;
  uf?: string | null;
  city?: string | null;
  neighborhood?: string | null;
  street?: string | null;
  number?: string | null;
  complement?: string | null;
}

export interface EscolaResponseDTO {
  id?: string;
  code?: string;
  name?: string;
  email?: string | null;
  phone?: string | null;
  uf?: string | null;
  city?: string | null;
  neighborhood?: string | null;
  street?: string | null;
  number?: string | null;
  complement?: string | null;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}