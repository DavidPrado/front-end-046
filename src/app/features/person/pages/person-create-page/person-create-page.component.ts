import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../../../core/services/person.service';
import {
  PersonRequestDTO,
  PersonResponseDTO,
} from '../../../../core/models/person.model';
import { MatriculaCompletaDTO } from '../../../../core/models/matricula.model';
import { PersonFormFieldsComponent } from '../../components/person-form-fields/person-form-fields.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepperModule, MatStepper } from '@angular/material/stepper';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormArray, FormsModule } from '@angular/forms';
import { StudentFormFieldsComponent } from '../../components/student-form-fields/student-form-fields.component';
import { EmployeeFormFieldsComponent } from '../../components/employee-form-fields/employee-form-fields.component';
import { MatIconModule } from '@angular/material/icon';
import { StudentService } from '../../../../core/services/student.service';
import { CourseStudentService } from '../../../../core/services/course-student.service';
import { EmployeeService } from '../../../../core/services/employee.service';
import { MatriculaService } from '../../../../core/services/matricula.service';
import { EnterpriseService } from '../../../../core/services/enterprise.service';
import { PositionEnterpriseService } from '../../../../core/services/position-enterprise.service';
import { StudentResponsibleService } from '../../../../core/services/student-responsible.service';
import { forkJoin, switchMap, of, catchError, Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import {
  ReactiveFormsModule,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-person-create-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatStepperModule,
    MatButtonToggleModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatCheckboxModule,
    MatButtonModule,
    PersonFormFieldsComponent,
    StudentFormFieldsComponent,
    EmployeeFormFieldsComponent,
  ],
  templateUrl: './person-create-page.component.html',
  styleUrl: './person-create-page.component.scss',
})
export class PersonCreatePageComponent implements OnInit {
  private personService = inject(PersonService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);
  private studentService = inject(StudentService);
  private courseStudentService = inject(CourseStudentService);
  private studentResponsibleService = inject(StudentResponsibleService);
  private enterpriseService = inject(EnterpriseService);
  private positionEnterpriseService = inject(PositionEnterpriseService);
  private employeeService = inject(EmployeeService);
  private fb = inject(FormBuilder);
  private matriculaService = inject(MatriculaService);

  @ViewChild('stepper') stepper!: MatStepper;

  personData: PersonResponseDTO | null = null;
  isEditMode = false;
  personId: string | null | undefined = null;
  selectedRole: 'STUDENT' | 'EMPLOYEE' | 'GUARDIAN' | null = null;
  showSpecialization = false;
  isStudent: boolean = false;
  isEmployee: boolean = false;

  existingStudentId: string | null = null;
  existingEmployeeId: string | null = null;

  roleFormGroup: FormGroup = this.fb.group({});

  studentForm = this.fb.group({
    idSchool: ['', Validators.required],
    courseIds: [[] as string[]],
    responsibles: this.fb.array([]),
  });

  employeeForm = this.fb.group({
    idEnterprise: [null as any, Validators.required],
    idPosition: [null as any, Validators.required],
  });

  ngOnInit() {
    this.personId = this.route.snapshot.paramMap.get('id');

    if (this.personId) {
      this.isEditMode = true;
      this.loadPerson(this.personId);
    }
  }

  toggleRole(role: 'student' | 'employee') {
    if (role === 'student') {
      this.isStudent = !this.isStudent;
    } else if (role === 'employee') {
      this.isEmployee = !this.isEmployee;
    }
  }

  loadPerson(id: string) {
    this.personService.findById(id).subscribe({
      next: (data) => {
        this.personData = data;
        this.checkExistingRoles(id);
      },
      error: () => {
        this.snackBar.open('Erro ao carregar dados da pessoa.', 'Fechar', {
          duration: 3000,
        });
        this.handleBack();
      },
    });
  }

  private checkExistingRoles(personId: string) {
    this.studentService
      .findByIdPerson(personId)
      .pipe(catchError(() => of(null)))
      .subscribe((student) => {
        if (student && student.id) {
          const studentId: string = student.id;

          this.isStudent = true;
          this.existingStudentId = studentId;
          this.studentForm.patchValue({ idSchool: student.idSchool });

          this.courseStudentService
            .findByIdStudent(studentId)
            .subscribe((cursos) => {
              const ids = cursos.map((c: any) => c.idCourse);
              this.studentForm.patchValue({ courseIds: ids });
            });

          this.studentResponsibleService
            .findByIdStudent(studentId)
            .subscribe((resps) => {
              this.fillResponsiblesArray(resps);
            });
        }
      });

    this.employeeService
      .findByIdPerson(personId)
      .pipe(
        catchError(() => of(null)),
        switchMap((emp) => {
          if (!emp) return of(null);
          this.existingEmployeeId = emp.id || null;
          this.isEmployee = true;

          return forkJoin({
            enterprise: this.enterpriseService.findById(emp.idEnterprise!),
            position: this.positionEnterpriseService.findById(
              emp.idPositionEnterprise!,
            ),
          });
        }),
      )
      .subscribe((res) => {
        if (res) {
          this.employeeForm.patchValue({
            idEnterprise: res.enterprise,
            idPosition: res.position,
          });
        }
      });
  }

  private fillResponsiblesArray(responsibles: any[]) {
    const formArray = this.studentForm.get('responsibles') as FormArray;

    formArray.clear();

    responsibles.forEach((resp) => {
      if (typeof resp.idPerson === 'string') {
        this.personService.findById(resp.idPerson).subscribe({
          next: (personFullObject) => {
            formArray.push(
              this.createResponsibleGroup(
                personFullObject,
                resp.kinship,
                resp.id,
              ),
            );
          },
        });
      } else {
        formArray.push(
          this.createResponsibleGroup(
            resp.person || resp.idPerson,
            resp.kinship,
            resp.id,
          ),
        );
      }
    });
  }
  private createResponsibleGroup(
    person: any,
    kinship: any,
    vinculationId?: string,
  ) {
    const group = this.fb.group({
      id: [vinculationId || null],
      person: [person, Validators.required],
      kinship: [kinship, Validators.required],
    });
    return group;
  }

  handleSave(data: PersonRequestDTO) {
    const request =
      this.isEditMode && this.personId
        ? this.personService.update(this.personId, data)
        : this.personService.create(data);

    request.subscribe({
      next: (response) => {
        if (!this.personId) this.personId = response.id;

        this.snackBar.open(
          `Pessoa ${this.isEditMode ? 'atualizada' : 'salva'} com sucesso!`,
          'Fechar',
          { duration: 3000 },
        );

        setTimeout(() => {
          if (this.stepper) {
            this.stepper.next();
          }
        }, 150);
      },
      error: (err) => {
        const errorMessage =
          err.error?.message || 'Erro ao processar operação.';
        this.snackBar.open(errorMessage, 'FECHAR', {
          duration: 7000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snack-error'],
        });
      },
    });
  }

  handleStudentSave(studentData: any) {
    const alunoPayload = {
      idPerson: this.personId,
      idSchool: studentData.idSchool,
    };

    this.snackBar.open('Processando matrícula...', 'Aguarde');

    this.studentService
      .create(alunoPayload)
      .pipe(
        switchMap((alunoResponse: any) => {
          const studentId = alunoResponse.id;

          const cursoRequests = (studentData.courseIds || []).map(
            (courseId: string) =>
              this.courseStudentService.create({
                idStudent: studentId,
                idCourse: courseId,
              }),
          );

          const responsavelRequests = (studentData.responsibles || []).map(
            (resp: any) =>
              this.studentResponsibleService.create({
                idStudent: studentId,
                idPerson: resp.idPerson,
                kinship: resp.kinship,
              }),
          );

          const allRequests = [...cursoRequests, ...responsavelRequests];

          return allRequests.length > 0 ? forkJoin(allRequests) : of([]);
        }),
      )
      .subscribe({
        next: () => {
          this.snackBar.open(
            'Matrícula e vínculos realizados com sucesso!',
            'OK',
            { duration: 3000 },
          );
          this.handleBack();
        },
        error: (err) => {
          console.error('Erro detalhado no salvamento:', err);
          let msg = 'Erro ao processar matrícula.';
          if (err.error && typeof err.error === 'object') {
            msg = err.error.message || Object.values(err.error)[0] || msg;
          }

          this.snackBar.open(msg, 'Fechar', { duration: 7000 });
        },
      });
  }

  handleEmployeeSave(employeeData: any) {
    this.snackBar.open('Vinculando funcionário...', 'Aguarde');

    this.employeeService.create(employeeData).subscribe({
      next: () => {
        this.snackBar.open(
          'Vínculo de funcionário realizado com sucesso!',
          'OK',
          { duration: 3000 },
        );
        this.handleBack();
      },
      error: (err) => {
        console.error('Erro ao salvar funcionário:', err);
        const msg =
          err.error?.message || 'Erro ao processar vínculo de funcionário.';
        this.snackBar.open(msg, 'Fechar', { duration: 7000 });
      },
    });
  }

  onEspecializacaoFinalizada() {
    if (
      (this.isStudent && this.studentForm.invalid) ||
      (this.isEmployee && this.employeeForm.invalid)
    ) {
      this.snackBar.open(
        'Por favor, preencha todos os campos obrigatórios corretamente.',
        'OK',
        { duration: 5000 },
      );
      return;
    }

    const mainRequests: Observable<any>[] = [];

    if (this.isStudent) {
      const studentRaw = this.studentForm.getRawValue();

      const matriculaPayload: MatriculaCompletaDTO = {
        aluno: {
          idPerson: this.personId!,
          idSchool: studentRaw.idSchool ?? undefined,
        },
        courseIds: studentRaw.courseIds ?? [],
        responsaveis: (studentRaw.responsibles || []).map((r: any) => ({
          id: r.id || undefined,
          idPerson: r.person?.id || r.person,
          kinship: r.kinship,
        })),
      };

      mainRequests.push(
        this.matriculaService.enviarMatricula(matriculaPayload),
      );
    }
    if (this.isEmployee) {
      const employeeRaw = this.employeeForm.getRawValue();
      const employeePayload = {
        idPerson: this.personId!,
        idEnterprise: this.getIdentifier(this.employeeForm.value.idEnterprise),
        idPositionEnterprise: this.getIdentifier(
          this.employeeForm.value.idPosition,
        ),
      };

      const empObs = this.existingEmployeeId
        ? this.employeeService.update(this.existingEmployeeId, employeePayload)
        : this.employeeService.create(employeePayload);

      mainRequests.push(empObs);
    }

    if (mainRequests.length > 0) {
    this.snackBar.open('Finalizando cadastros...', 'Aguarde');

    forkJoin(mainRequests).subscribe({
      next: () => {
        this.snackBar.open(
          'Cadastro e vínculos realizados com sucesso!',
          'OK',
          { duration: 3000 }
        );
        
        this.router.navigate(['/home/pessoas/list']); 
      },
      error: (err) => {
        console.error('Erro ao finalizar cadastro:', err);
        const errorMsg = err.error?.message || 'Erro ao salvar vínculos.';
        this.snackBar.open(errorMsg, 'Fechar', { duration: 7000 });
      },
    });
  } else {
    this.router.navigate(['/home/pessoas/list']);
  }
  }

  private getIdentifier(value: any): string | null {
    if (!value) return null;
    return typeof value === 'object' ? value.id : value;
  }

  private prepareStudentCreate(payload: any): Observable<any> {
    return this.studentService
      .create({
        idPerson: payload.idPerson,
        idSchool: payload.idSchool,
      })
      .pipe(
        switchMap((newStudent: any) => {
          const subRequests = this.saveStudentVincule(
            newStudent.id,
            payload.courseIds,
            payload.responsibles,
          );
          return subRequests.length > 0 ? forkJoin(subRequests) : of([]);
        }),
      );
  }

  private handleUpdateStudent(
    studentId: string,
    payload: any,
  ): Observable<any> {
    return this.studentService
      .update(studentId, {
        idPerson: payload.idPerson,
        idSchool: payload.idSchool,
      })
      .pipe(
        switchMap(() => {
          const subRequests = this.saveStudentVincule(
            studentId,
            payload.courseIds,
            payload.responsibles,
          );
          return subRequests.length > 0 ? forkJoin(subRequests) : of([]);
        }),
      );
  }

  private saveStudentVincule(
    studentId: string,
    courseIds: string[],
    responsibles: any[],
  ): Observable<any>[] {
    const requests: Observable<any>[] = [];

    responsibles.forEach((resp) => {
      const p = {
        idStudent: studentId,
        idPerson: resp.idPerson,
        kinship: resp.kinship,
      };
      if (resp.id) {
        requests.push(this.studentResponsibleService.update(resp.id, p));
      } else {
        requests.push(this.studentResponsibleService.create(p));
      }
    });

    courseIds.forEach((cId) => {
      requests.push(
        this.courseStudentService
          .create({ idStudent: studentId, idCourse: cId })
          .pipe(catchError(() => of(null))),
      );
    });

    return requests;
  }

  handleBack() {
    if (this.stepper && this.stepper.selectedIndex > 0) {
      this.stepper.previous();
    } else {
      this.router.navigate(['/home/pessoas/list']);
    }
  }

  onEmployeeDeleted() {
    this.isEmployee = false;
    this.existingEmployeeId = null;
    this.employeeForm.reset();
  }

  onStudentDeleted() {
    this.isStudent = false;
    this.existingStudentId = null;
    this.studentForm.reset();

    const resps = this.studentForm.get('responsibles') as FormArray;
    resps.clear();
  }

  voltarParaInformacoesGerais() {
    if (this.stepper) {
      this.stepper.previous();
    }
  }
}
