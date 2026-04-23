export interface EstagioRequestDTO {
  id?: string; 
  idStudent?: string;
  idEnterprise?: string;
  idEmployeeSupervisor?: string;
  startDate?: string | Date;
  endDate?: string | Date;
  intershipSalary?: number;
  hoursPerWeek?: number;
  hoursPerDay?: number;
  terminationContract?: boolean;
  terminationContractReason?: string;
}

export interface EstagioRequestListDTO {
  id?: string;                       
  idStudent?: string;               
  idEnterprise?: string;             
  idEmployeeSupervisor?: string;     
  startDate?: string;                
  endDate?: string;                  
  intershipSalary?: number;          
  hoursPerWeek?: number;             
  hoursPerDay?: number;              
  terminationContract?: boolean;     
  terminationContractReason?: string;
  studentName?: string;
  studentCpf?: string;
  enterpriseName?: string;
  enterpriseCnpj?: string;
  vencimento30Dias?: boolean
}

export interface EstagioResponseDTO {
  id: string;                       
  idStudent: string;                
  idEnterprise: string;             
  idEmployeeSupervisor: string;     
  startDate: string;                
  endDate: string;                  
  intershipSalary: number;          
  hoursPerWeek: number;             
  hoursPerDay: number;              
  terminationContract: boolean;     
  terminationContractReason: string;
  studentName: string;
  studentCpf: string;
  enterpriseName: string;
  enterpriseCnpj: string;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}