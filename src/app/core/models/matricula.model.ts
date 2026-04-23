import { AlunoRequestDTO } from "./student.model";
import { ResponsavelVinculoDTO} from './student-responsible';

export interface MatriculaCompletaDTO{
    aluno: AlunoRequestDTO;
    courseIds: string[];
    responsaveis: ResponsavelVinculoDTO[];
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}