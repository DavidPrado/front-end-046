import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EstagioRequestDTO } from '../../../../core/models/internship.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Observable, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
  catchError,
} from 'rxjs/operators';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { StudentService } from '../../../../core/services/student.service';
import { EnterpriseService } from '../../../../core/services/enterprise.service';
import { EmployeeService } from '../../../../core/services/employee.service';

@Component({
  selector: 'app-internship-form-fields',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatSelectModule,
    CommonModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    CommonModule,
  ],
  templateUrl: './internship-form-fields.component.html',
  styleUrl: './internship-form-fields.component.scss',
})
export class InternshipFormFieldsComponent implements OnChanges {
  private studentService = inject(StudentService);
  private enterpriseService = inject(EnterpriseService);
  private employeeService = inject(EmployeeService);
  private fb = inject(FormBuilder);

  @Input() initialData: any | null = null;
  @Input() isEditMode = false;

  @Output() save = new EventEmitter<EstagioRequestDTO>();
  @Output() cancel = new EventEmitter<void>();

  filteredStudents$!: Observable<any[]>;
  filteredEnterprises$!: Observable<any[]>;
  filteredSupervisors$!: Observable<any[]>;

  form = this.fb.group({
    id: [''],
    idStudent: [null as any, Validators.required], // Aceitará objeto ou string
    idEnterprise: [null as any, Validators.required],
    idEmployeeSupervisor: [null as any, Validators.required],
    startDate: ['', Validators.required],
    endDate: [''],
    intershipSalary: [null as number | null, [Validators.min(0)]],
    hoursPerWeek: [
      null as number | null,
      [Validators.min(1), Validators.max(40)],
    ],
    hoursPerDay: [
      null as number | null,
      [Validators.min(1), Validators.max(8)],
    ],
    terminationContract: [false],
    terminationContractReason: [''],
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialData'] && this.initialData) {
      const data = this.initialData;

      const formValue: any = {
        ...data,

        idStudent: data.idStudent
          ? {
              id: data.idStudent,
              namePerson: data.studentName,
              cpfPerson: data.studentCpf,
            }
          : null,

        idEnterprise: data.idEnterprise
          ? {
              id: data.idEnterprise,
              name: data.enterpriseName,
              cnpj: data.enterpriseCnpj,
            }
          : null,

        idEmployeeSupervisor: data.idEmployeeSupervisor
          ? {
              id: data.idEmployeeSupervisor,
              namePerson: data.supervisorName || 'Supervisor Selecionado',
            }
          : null,

        startDate: this.formatDateToInput(data.startDate),
        endDate: this.formatDateToInput(data.endDate),
      };

      this.form.patchValue(formValue);
    }
  }

  displayFn(data: any): string {
    if (!data) return '';
    return data.namePerson || data.name || data.nomePessoa || '';
  }

  private setupAutocomplete(
    controlName: string,
    searchFn: (value: string) => Observable<any>,
  ): Observable<any[]> {
    return this.form.get(controlName)!.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value) => {
        if (typeof value === 'string' && value.length > 1) {
          return searchFn(value).pipe(
            map((res: any) => (res && res.content ? res.content : res)),
            catchError(() => of([])),
          );
        }
        return of([]);
      }),
    );
  }

  ngOnInit() {
    this.filteredStudents$ = this.setupAutocomplete('idStudent', (val) =>
      this.studentService
        .findAllStudent({ query: val })
        .pipe(map((res: any) => res.content || res)),
    );

    this.filteredEnterprises$ = this.setupAutocomplete('idEnterprise', (val) =>
      this.enterpriseService
        .findByTerm(val)
        .pipe(map((res: any) => res.content || res)),
    );

    this.filteredSupervisors$ = this.setupAutocomplete(
      'idEmployeeSupervisor',
      (val) =>
        this.employeeService
          .findByTerm(val)
          .pipe(map((res: any) => res.content || res)),
    );
  }

  private formatDateToInput(date: string | Date | undefined): string {
    if (!date) return '';
    if (date instanceof Date) {
      return date.toISOString().split('T')[0];
    }
    return date.split('T')[0];
  }

  submit() {
    if (this.form.valid) {
      const raw = this.form.getRawValue();

      const extractId = (value: any): string | undefined => {
        if (!value) return undefined;
        return typeof value === 'object' ? value.id : value;
      };

      const payload: EstagioRequestDTO = {
        id: raw.id || undefined,

        idStudent: extractId(raw.idStudent) ?? '',
        idEnterprise: extractId(raw.idEnterprise) ?? '',
        idEmployeeSupervisor: extractId(raw.idEmployeeSupervisor) ?? '',

        startDate: raw.startDate ? raw.startDate.split('T')[0] : undefined,
        endDate: raw.endDate ? raw.endDate.split('T')[0] : undefined,

        intershipSalary: raw.intershipSalary ?? undefined,
        hoursPerWeek: raw.hoursPerWeek ?? undefined,
        hoursPerDay: raw.hoursPerDay ?? undefined,
        terminationContract: raw.terminationContract ?? false,
        terminationContractReason: raw.terminationContractReason || undefined,
      };

      console.log('Enviando Payload:', payload);
      this.save.emit(payload);
    } else {
      this.form.markAllAsTouched();
      console.warn('Formulário inválido');
    }
  }
}
