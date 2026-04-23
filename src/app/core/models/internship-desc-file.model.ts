export interface EstagioDescArquivoRequestDTO {
  id?: string;
  idInternship?: string;
  fileName?: string;
  fileDescription?: string;
  fileSize?: number;
}

export interface EstagioDescArquivoResponseDTO {
  id: string;              
  idInternship: string;
  fileName: string;
  fileDescription: string;
  fileSize: number;        
  mimeType: string;        
}