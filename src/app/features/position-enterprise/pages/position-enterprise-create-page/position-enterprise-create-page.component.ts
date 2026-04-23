import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  CargoEmpresaRequestDTO,
  CargoEmpresaResponseDTO,
} from '../../../../core/models/position-enterprise.model';
import { PositionEnterpriseFormFieldsComponent } from '../../components/position-enterprise-form-fields/position-enterprise-form-fields.component';
import { PositionEnterpriseService } from '../../../../core/services/position-enterprise.service';

@Component({
  selector: 'app-position-enterprise-create-page',
  standalone: true,
  imports: [PositionEnterpriseFormFieldsComponent],
  template: `
    <app-position-enterprise-form-fields
      [initialData]="positionEnterpriseData"
      [isEditMode]="isEditMode"
      (save)="handleSave($event)"
      (cancel)="handleBack()"
    ></app-position-enterprise-form-fields>
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
export class PositionEnterpriseCreatePageComponent implements OnInit {

  private positionEnterpriseService = inject(PositionEnterpriseService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);


  positionEnterpriseData: CargoEmpresaResponseDTO | null = null;
  isEditMode = false;
  positionEnterpriseId: string | null = null;

  ngOnInit() {
    this.positionEnterpriseId = this.route.snapshot.paramMap.get('id');

    if (this.positionEnterpriseId) {
      this.isEditMode = true;
      this.loadPerson(this.positionEnterpriseId);
    }
  }

  
  loadPerson(id: string) {
    this.positionEnterpriseService.findById(id).subscribe({
      next: (data) => {
        this.positionEnterpriseData = data;
      },
      error: () => {
        this.snackBar.open('Erro ao carregar dados da pessoa.', 'Fechar', {
          duration: 3000,
        });
        this.handleBack();
      },
    });
  }

  
  handleBack() {
    this.router.navigate(['/home/cargos/list']);
  }

    handleSave(data: CargoEmpresaRequestDTO) {
      const request =
        this.isEditMode && this.positionEnterpriseId
          ? this.positionEnterpriseService.update(this.positionEnterpriseId, data)
          : this.positionEnterpriseService.create(data);
  
      request.subscribe({
        next: () => {
          this.snackBar.open(
            `Cargo ${this.isEditMode ? 'atualizada' : 'salva'} com sucesso!`,
            'Fechar',
            { duration: 3000 },
          );
          this.handleBack();
        },
        error: (err) => {
          const errorMessage =
            err.error?.message || 'Erro ao processar operação.';
          this.snackBar.open(errorMessage, 'Fechar', { duration: 5000 });
        },
      });
    }

}
