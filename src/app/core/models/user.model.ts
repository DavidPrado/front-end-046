export interface UserListRequestDTO {
  code?: number | null;
  name?: string;
  email?: string;
  password?: string;
  mustChangePassword?: boolean | null;
  cpf?: string;
  phoneNumber?: string;
  birthDate?: string | Date | null;
  active?: boolean | null;
}

export interface UserListResponseDTO {
  id?: string;
  code?: number;
  name?: string;
  email?: string;
  mustChangePassword?: boolean;
  cpf?: string;
  phoneNumber?: string;
  birthDate?: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserResponseDTO {
  id?: string;
  code?: number;
  name?: string;
  email?: string;
  mustChangePassword?: boolean;
  cpf?: string;
  phoneNumber?: string;
  birthDate?: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
