import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EnterpriseFormFieldsComponent } from '../../components/enterprise-form-fields/enterprise-form-fields.component';
import { EnterpriseService } from '../../../../core/services/enterprise.service';
import {
  EmpresaRequestDTO,
  EmpresaResponseDTO,
} from '../../../../core/models/enterprise.model';

@Component({
  selector: 'app-enterprise-create-page',
  standalone: true,
  imports: [EnterpriseFormFieldsComponent],
  template: `<app-enterprise-form-fields
    [initialData]="enterpriseData"
    [isEditMode]="isEditMode"
    (save)="handleSave($event)"
    (cancel)="handleBack()"
  >
  </app-enterprise-form-fields> `,
  styles: [
    `
      .person-container {
        padding: 2rem;
      }
      .card-title {
        font-weight: 500;
        color: #333;
      }
    `,
  ],
})
export class EnterpriseCreatePageComponent implements OnInit {
  private enterpriseService = inject(EnterpriseService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  enterpriseData: EmpresaResponseDTO | null = null;
  isEditMode = false;
  enterpriseId: string | null = null;

  ngOnInit(): void {
    this.enterpriseId = this.route.snapshot.paramMap.get('id');

    if (this.enterpriseId) {
      this.isEditMode = true;
      this.loadEnterprise(this.enterpriseId);
    }
  }

  
  loadEnterprise(id: string) {
    this.enterpriseService.findById(id).subscribe({
      next: (data) => {
        this.enterpriseData = data;
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
    this.router.navigate(['/home/empresas/list']);
  }

  handleSave(data: EmpresaRequestDTO) {
    const request =
      this.isEditMode && this.enterpriseId
        ? this.enterpriseService.update(this.enterpriseId, data)
        : this.enterpriseService.create(data);

    request.subscribe({
      next: () => {
        this.snackBar.open(
          `Empresa ${this.isEditMode ? 'atualizada' : 'salva'} com sucesso!`,
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
