export interface PermissionDTO {
  id: string;
  name: string;
  description: string;
}

export interface RoleRequestDTO {
  name: string;
  description: string;
  permissionIds: string[];
}

export interface RoleResponseDTO {
  id: string;
  name: string;
  description: string;
  permissionIds: string[]; 
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}