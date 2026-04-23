import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SchoolFormFieldsComponent } from '../../components/school-form-fields/school-form-fields.component';
import { SchoolService } from '../../../../core/services/school.service';
import {
  EscolaRequestDTO,
  EscolaResponseDTO,
} from '../../../../core/models/school.model';

@Component({
  selector: 'app-school-create-page',
  standalone: true,
  imports: [SchoolFormFieldsComponent],
  template: `
    <app-school-form-fields
      [initialData]="schoolData"
      [isEditMode]="isEditMode"
      (save)="handleSave($event)"
      (cancel)="handleBack()"
    >
    </app-school-form-fields>
  `,
  styles: [
    `
      .card-title {
        font-weight: 500;
        color: #333;
      }
    `,
  ],
})

export class SchoolCreatePageComponent implements OnInit {
  private schoolService = inject(SchoolService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  schoolData: EscolaResponseDTO | null = null;
  isEditMode = false;
  schoolId: string | null = null;

  ngOnInit(): void {
    this.schoolId = this.route.snapshot.paramMap.get('id');

    if (this.schoolId) {
      this.isEditMode = true;
      this.loadSchool(this.schoolId);
    }
  }

  loadSchool(id: string) {
    this.schoolService.findById(id).subscribe({
      next: (data) => {
        this.schoolData = data;
      },
      error: () => {
        this.snackBar.open('Erro ao carregar dados da pessoa', 'Fechar', {
          duration: 3000,
        });
        this.handleBack();
      },
    });
  }
  handleBack() {
    this.router.navigate(['/home/escolas/list']);
  }

  handleSave(data: EscolaRequestDTO) {
    const request =
      this.isEditMode && this.schoolId
        ? this.schoolService.update(this.schoolId, data)
        : this.schoolService.create(data);

    request.subscribe({
      next: () => {
        this.snackBar.open(
          `Escola ${this.isEditMode ? 'atualizada' : 'salva'} com sucesso!`,
          'Fechar',
          { duration: 3000 },
        );
        this.handleBack();
      },
      error: (err) => {
        let errorMessage = 'Erro ao processar operação.';

        if (err.status === 401) {
          errorMessage = 'Sua sessão expirou. Por favor, faça login novamente.';
        } else {
          errorMessage = err.error?.message || errorMessage;
        }

        this.snackBar.open(errorMessage, 'Fechar', { duration: 5000 });
      },
    });
  }
}
