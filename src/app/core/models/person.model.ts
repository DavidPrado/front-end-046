export interface PersonRequestDTO {
  name?: string;
  rg?: string;
  cpf?: string;
  email?: string;
  dateOfBirth?: string | Date | null;
  phoneHome?: string;
  phoneMobile?: string;
  phoneWork?: string;
  uf?: string;
  city?: string;
  neighborhood?: string;
  street?: string;
  number?: string;
  complement?: string;
}


export interface PersonResponseDTO {
  id?: string;
  name?: string;
  rg?: string;
  cpf?: string;
  email?: string;
  dateOfBirth?: string | Date | null;
  phoneHome?: string;
  phoneMobile?: string;
  phoneWork?: string;
  uf?: string;
  city?: string;
  neighborhood?: string;
  street?: string;
  number?: string;
  complement?: string;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}