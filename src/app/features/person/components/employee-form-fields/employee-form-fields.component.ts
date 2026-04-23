import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  inject,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from '../../../../core/services/employee.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../confirmation/confirmation-dialog.component'; // ajuste o caminho se necessário
import {
  Observable,
  map,
  startWith,
  of,
  catchError,
  debounce,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';

import { EnterpriseService } from '../../../../core/services/enterprise.service';
import { PositionEnterpriseService } from '../../../../core/services/position-enterprise.service';
import {
  EmpresaResponseDTO,
  EmpresaRequestDTO,
} from '../../../../core/models/enterprise.model';
import {
  CargoEmpresaRequestDTO,
  CargoEmpresaResponseDTO,
} from '../../../../core/models/position-enterprise.model';

@Component({
  selector: 'app-employee-form-fields',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './employee-form-fields.component.html',
  styleUrl: './employee-form-fields.component.scss',
})
export class EmployeeFormFieldsComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() existingEmployeeId: string | null = null;
  @Output() deleted = new EventEmitter<void>();

  private enterpriseService = inject(EnterpriseService);
  private employeeService = inject(EmployeeService);
  private positionEnterpriseService = inject(PositionEnterpriseService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  filteredEnterprise$!: Observable<EmpresaResponseDTO[]>;
  filteredPositions$!: Observable<CargoEmpresaResponseDTO[]>;

  ngOnInit(): void {
    this.setupAutocomplete();
  }

  displayFn(option: any): string {
    return option && option.name
      ? option.name
      : option && option.position
        ? option.position
        : '';
  }

  removeEmployeeVincule() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        message:
          'Tem certeza que deseja remover este vínculo de funcionário? Esta ação não pode ser desfeita.',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && this.existingEmployeeId) {
        this.employeeService.delete(this.existingEmployeeId).subscribe({
          next: () => {
            this.snackBar.open(
              'Vínculo de funcionário removido com sucesso!',
              'OK',
              {
                duration: 3000,
                panelClass: ['snack-success'],
              },
            );
            this.deleted.emit(); // Notifica o pai para limpar a tela
          },
          error: (err) => {
            console.error('Erro ao deletar:', err);
            this.snackBar.open(
              'Erro ao remover vínculo. Tente novamente.',
              'Fechar',
              {
                duration: 5000,
              },
            );
          },
        });
      }
    });
  }

  private setupAutocomplete() {
    this.filteredEnterprise$ = this.form.get('idEnterprise')!.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value) => {
        const term = typeof value === 'string' ? value : '';
        if (term.length < 2) return of([]);

        return this.enterpriseService.findByTerm(term).pipe(
          map((response) => response.content),
          catchError(() => of([])),
        );
      }),
    );

    this.filteredPositions$ = this.form.get('idPosition')!.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value) => {
        const term = typeof value === 'string' ? value : '';
        if (term.length < 2) return of([]);
        return this.positionEnterpriseService.findByTerm(term).pipe(
          map((response) => response.content),
          catchError(() => of([])),
        );
      }),
    );
  }
}
