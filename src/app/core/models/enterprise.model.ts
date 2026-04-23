export interface EmpresaRequestDTO {
    name?: string;
    cnpj?: string;
    email?: string;
    phone?: string;
    uf?: string;
    city?: string;
    neighborhood?: string;
    street?: string;
    cep?: string;
    number?: string;
    complement?: string;
    stateRegistration?: string;
    municipalRegistration?: string;
    corporateName?: string;
    fantasyName?: string;
    cnae?: string;
}

export interface EmpresaResponseDTO {
    id?: string;
    name?: string;
    cnpj?: string;
    email?: string;
    phone?: string;
    uf?: string;
    city?: string;
    neighborhood?: string;
    street?: string;
    cep?: string;
    number?: string;
    complement?: string;
    stateRegistration?: string;
    municipalRegistration?: string;
    corporateName?: string;
    fantasyName?: string;
    cnae?: string;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}