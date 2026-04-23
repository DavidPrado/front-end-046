import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnterpriseListTableComponent } from '../../components/enterprise-list-table/enterprise-list-table.component';
import {
  EmpresaResponseDTO,
  EmpresaRequestDTO,
} from '../../../../core/models/enterprise.model';
import { EnterpriseService } from '../../../../core/services/enterprise.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../../confirmation/confirmation-dialog.component';

@Component({
  selector: 'app-enterprise-list-page',
  standalone: true,
  imports: [CommonModule, EnterpriseListTableComponent],
  template: `
    <app-enterprise-list-table
      [dataSource]="enterprises"
      [totalElements]="totalElements"
      [pageSize]="pageSize"
      (onFilter)="handleFilter($event)"
      (onDeleteSelected)="handleDelete($event)"
      (onPage)="handlePageEvent($event)"
    >
      ></app-enterprise-list-table
    >
  `,
})
export class EnterpriseListPageComponent implements OnInit {
  enterprises: EmpresaResponseDTO[] = [];
  totalElements = 0;
  currentPage = 0;
  pageSize = 10;
  currentFilter: EmpresaRequestDTO = {};

  constructor(
    private enterpriseService: EnterpriseService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.enterpriseService
      .findAllEnterprises(this.currentFilter, this.currentPage, this.pageSize)
      .subscribe({
        next: (response) => {
          this.enterprises = response.content || [];
          this.totalElements = response.totalElements || 0;
        },
        error: (err) => {
          console.error('Erro ao buscar empresas', err);
          this.enterprises = [];
          this.snackBar.open('Erro ao carregar lista de empresas.', 'Fechar', {
            duration: 5000,
          });
        },
      });
  }

  handleFilter(event: EmpresaRequestDTO): void {
    this.currentFilter = event;
    this.currentPage = 0;
    this.loadData();
  }

  handlePageEvent(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  handleDelete(ids: string[]): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { message: `Deseja realmente excluir ${ids.length} registro(s)?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.enterpriseService.deleteEnterpriseBatch(ids).subscribe({
          next: () => {
            this.snackBar.open(
              'Empresa(s) excluida(s) com sucesso!',
              'Fechar',
              {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
                panelClass: ['success-snackbar'],
              },
            );
            this.loadData();
          },
          error: (err) => {
            this.snackBar.open('Erro ao excluir registros', 'Fechar', {
              duration: 3000,
            });
          },
        });
      }
    });
  }
}
