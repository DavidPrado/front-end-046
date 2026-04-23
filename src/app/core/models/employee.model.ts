export interface FuncionarioRequestDTO {
  idPerson?: string;          
  idEnterprise?: string;       
  idPositionEnterprise?: string; 
  query?: string;
}

export interface FuncionarioResponseDTO {
  id?: string;              
  idPerson?: string;
  idEnterprise?: string;
  idPositionEnterprise?: string;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}