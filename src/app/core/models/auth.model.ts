export interface LoginRequest{
    email: string;
    password: string;
}

export interface LoginResponse{
    token: string;
    type: string;
    email: string;
    role: string;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}