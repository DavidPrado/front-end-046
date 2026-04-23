import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card'; // Adicionado
import { MatIconModule } from '@angular/material/icon'; // Adicionado
import { InternshipFormFieldsComponent } from '../../components/internship-form-fields/internship-form-fields.component';
import { InternshipFileManagerComponent } from '../../components/internship-form-fields/internship-file-manager/internship-file-manager.component';
import { InternshipService } from '../../../../core/services/internship.service';
import {
  EstagioRequestDTO,
  EstagioResponseDTO,
} from '../../../../core/models/internship.model';

@Component({
  selector: 'app-internship-create-page',
  standalone: true,
  // Adicionado MatCardModule e MatIconModule para o template funcionar
  imports: [
    InternshipFormFieldsComponent, 
    InternshipFileManagerComponent, 
    MatCardModule, 
    MatIconModule
  ],
  template: `
    <app-internship-form-fields
      [initialData]="internshipData"
      [isEditMode]="isEditMode"
      (save)="handleSave($event)"
      (cancel)="handleBack()"
    ></app-internship-form-fields>

    @if (internshipId) {
      <div style="max-width: 1200px; margin: 24px auto; padding: 0 16px;">
        <app-internship-file-manager
          [internshipId]="internshipId"
        ></app-internship-file-manager>
      </div>
    } @else {
      <div style="max-width: 1200px; margin: 16px auto; padding: 0 16px; opacity: 0.6;">
        <mat-card class="mat-elevation-z1">
          <mat-card-content style="display: flex; align-items: center; gap: 8px; padding: 16px;">
            <mat-icon>info</mat-icon> 
            <span>Você poderá anexar arquivos após salvar os dados iniciais do estágio.</span>
          </mat-card-content>
        </mat-card>
      </div>
    }
  `,
})
export class InternshipCreatePageComponent implements OnInit {
  private internshipService = inject(InternshipService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  internshipData: EstagioResponseDTO | null = null;
  isEditMode = false;
  internshipId: string | null = null;

  ngOnInit(): void {
    this.internshipId = this.route.snapshot.paramMap.get('id');

    if (this.internshipId) {
      this.isEditMode = true;
      this.loadInternship(this.internshipId);
    }
  }

  loadInternship(id: string) {
    this.internshipService.findById(id).subscribe({
      next: (data) => {
        this.internshipData = data;
      },
      error: () => {
        this.snackBar.open('Erro ao carregar dados do estágio', 'Fechar', {
          duration: 3000,
        });
        this.handleBack();
      },
    });
  }

  handleBack() {
    this.router.navigate(['/home/estagios/list']);
  }

  handleSave(data: EstagioRequestDTO) {
    const request =
      this.isEditMode && this.internshipId
        ? this.internshipService.update(this.internshipId!, data)
        : this.internshipService.create(data);

    request.subscribe({
      next: (response: any) => {
        const msg = `Estágio ${this.isEditMode ? 'atualizado' : 'salvo'} com sucesso!`;
        this.snackBar.open(msg, 'Fechar', { duration: 3000 });

        if (!this.isEditMode) {
          this.internshipId = response.id;
          this.isEditMode = true;
          this.internshipData = response;
          window.history.replaceState({}, '', `/home/estagios/edit/${response.id}`);
        } else {
            this.handleBack();
        }
      },
      error: (err) => {
        let errorMessage = err.error?.message || 'Erro ao processar operação.';
        this.snackBar.open(errorMessage, 'Fechar', { duration: 5000 });
      },
    });
  }
}