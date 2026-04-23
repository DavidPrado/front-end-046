export interface EstagioArquivo {
  id?: string;              
  idFile: string;            
  binaryContent: Uint8Array | string; 
  sequenceOrder: number;
}

export interface EstagioArquivoRequest {
  idFile: string;
  binaryContent: Uint8Array | string;
  sequenceOrder: number;
}

export interface EstagioArquivoResponse extends EstagioArquivoRequest {
  id: string;
}