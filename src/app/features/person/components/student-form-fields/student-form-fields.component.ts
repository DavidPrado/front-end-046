import {
  Component,
  Input,
  OnInit,
  inject,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormArray,
  FormGroup,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CourseService } from '../../../../core/services/course.service';
import { SchoolService } from '../../../../core/services/school.service';
import { PersonService } from '../../../../core/services/person.service';
import { StudentService } from '../../../../core/services/student.service';
import { StudentResponsibleService } from '../../../../core/services/student-responsible.service';
import { ConfirmationDialogComponent } from '../../../confirmation/confirmation-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  map,
  catchError,
  of,
  Observable,
} from 'rxjs';
import { startWith } from 'rxjs/operators';

const PARENTESCO_OPTIONS = [
  { value: 'PAI', label: 'Pai' },
  { value: 'MAE', label: 'Mãe' },
  { value: 'AVO_PATERNO', label: 'Avô Paterno' },
  { value: 'AVO_PATERNA', label: 'Avó Paterna' },
  { value: 'AVO_MATERNO', label: 'Avô Materno' },
  { value: 'AVO_MATERNA', label: 'Avó Materna' },
  { value: 'TIO_TIA', label: 'Tio(a)' },
  { value: 'IRMAO_IRMA', label: 'Irmão(ã)' },
  { value: 'PADRASTO', label: 'Padrasto' },
  { value: 'MADRASTA', label: 'Madrasta' },
  { value: 'TUTOR_LEGAL', label: 'Tutor(a) Legal' },
  { value: 'BISAVO_BISAVA', label: 'Bisavô(ã)' },
  { value: 'CURADOR', label: 'Curador(a)' },
  { value: 'FAMILIA_ACOLHEDORA', label: 'Família Acolhedora' },
  { value: 'OUTROS', label: 'Outros' },
];

@Component({
  selector: 'app-student-form-fields',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    AsyncPipe,
    CommonModule,
  ],
  templateUrl: './student-form-fields.component.html',
  styleUrl: './student-form-fields.component.scss',
})
export class StudentFormFieldsComponent implements OnInit, OnChanges {
  private fb = inject(FormBuilder);
  private courseService = inject(CourseService);
  private schoolService = inject(SchoolService);
  private personService = inject(PersonService);
  private studentResponsibleService = inject(StudentResponsibleService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);
  private studentService = inject(StudentService);

  @Input() form!: any;
  @Input() personId!: string;
  @Input() existingStudentId: string | null = null;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();
  @Output() studentDeleted = new EventEmitter<void>();

  courses: any[] = [];
  schools: any[] = [];
  filteredPeople: Observable<any[]>[] = [];

  listaParentescos = PARENTESCO_OPTIONS;

  get responsibles(): FormArray {
    return this.form.get('responsibles') as FormArray;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['personId'] && this.personId) {
      this.form.patchValue({ idPerson: this.personId });
    }
  }

  ngOnInit() {
    if (this.personId) {
      this.form.patchValue({ idPerson: this.personId });
    }

    this.loadInitialData();
  }

  loadInitialData() {
    this.courseService.findAll().subscribe((res) => {
      this.courses = Array.isArray(res) ? res : [];
    });

    this.schoolService.findAll().subscribe((res) => {
      this.schools = Array.isArray(res) ? res : [];
    });
  }

  removeResponsible(index: number) {
    const group = this.responsibles.at(index) as FormGroup;
    const vinculationId = group.get('id')?.value;

    if (vinculationId) {
      this.dialog
        .open(ConfirmationDialogComponent, {
          width: '350px',
          data: { message: 'Deseja realmente remover este vínculo?' },
        })
        .afterClosed()
        .subscribe((result) => {
          if (result) {
            this.studentResponsibleService.delete(vinculationId).subscribe({
              next: () => {
                const actualIndex = this.responsibles.controls.indexOf(group);
                this.executeLocalRemoval(actualIndex);
                this.snackBar.open('Removido com sucesso', 'OK', {
                  duration: 2000,
                });
              },
            });
          }
        });
    } else {
      this.executeLocalRemoval(index);
    }
  }

  removeFullStudentVincule() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        message:
          'Atenção! Isso removerá a matrícula, o vínculo com cursos e responsáveis. Deseja continuar?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && this.existingStudentId) {
        this.studentService.delete(this.existingStudentId).subscribe({
          next: () => {
            this.snackBar.open(
              'Matrícula de aluno removida com sucesso!',
              'OK',
              { duration: 3000 },
            );
            this.studentDeleted.emit(); // Avisa o pai para atualizar a tela
          },
          error: (err) => {
            console.error(err);
            this.snackBar.open('Erro ao remover matrícula.', 'Fechar', {
              duration: 5000,
            });
          },
        });
      }
    });
  }
  uniqueKinshipValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formArray = this.responsibles;
      if (!formArray) return null;

      const value = control.value;
      const duplicates = formArray.controls.filter(
        (c) => c.get('kinship')?.value === value && value !== null,
      );

      if (duplicates.length > 1) {
        return { duplicateKinship: true };
      }
      return null;
    };
  }

  validateAllKinships() {
    this.responsibles.controls.forEach((control) => {
      control.get('kinship')?.updateValueAndValidity({ emitEvent: false });
    });
  }

  private executeLocalRemoval(index: number) {
    if (index !== -1 && index < this.responsibles.length) {
      this.responsibles.removeAt(index);
      this.filteredPeople.splice(index, 1);
      this.responsibles.controls.forEach((c) =>
        c.get('kinship')?.updateValueAndValidity(),
      );
    }
  }

  addResponsible(data?: any) {
    const group = this.fb.group({
      id: [data?.id || null],
      person: [data?.person || null, Validators.required],
      kinship: [
        data?.kinship || null,
        [Validators.required, this.uniqueKinshipValidator()],
      ],
    });

    this.responsibles.push(group);
    const index = this.responsibles.length - 1;
    this.setupAutocomplete(index);
  }

  private setupAutocomplete(index: number) {
    const group = this.responsibles.at(index) as FormGroup;
    const personControl = group.get('person');

    if (personControl) {
      this.filteredPeople[index] = personControl.valueChanges.pipe(
        startWith(personControl.value),
        debounceTime(300),
        distinctUntilChanged(),
        filter((value) => typeof value === 'string' && value.length >= 3),
        switchMap((value) =>
          this.personService.findByTerm(value).pipe(
            map((res: any) => res.content || res),
            catchError(() => of([])),
          ),
        ),
      );
    }
  }

  displayFn(person: any): string {
    return person && person.name ? person.name : '';
  }

  submit() {
    if (this.form.valid) {
      const rawValue = this.form.getRawValue();

      const payload = {
        idPerson: rawValue.idPerson,
        idSchool: rawValue.idSchool,
        courseIds: rawValue.courseIds,
        responsibles: rawValue.responsibles.map((r: any) => ({
          idPerson: r.person?.id,
          kinship: r.kinship,
        })),
      };

      console.log('Payload Final:', payload);
      this.save.emit(payload);
    }
  }

  onBack() {
    this.cancel.emit();
  }
}
