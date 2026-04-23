import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CargoEmpresaRequestDTO,
  CargoEmpresaResponseDTO,
} from '../../../../core/models/position-enterprise.model';
import { PositionEnterpriseService } from '../../../../core/services/position-enterprise.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../../confirmation/confirmation-dialog.component';
import { PositionEnterpriseListTableComponent } from '../../components/position-enterprise-list-table/position-enterprise-list-table.component';

@Component({
  selector: 'app-position-enterprise-list-page',
  standalone: true,
  imports: [CommonModule, PositionEnterpriseListTableComponent],
  template: `<app-position-enterprise-list-table
    [dataSource]="positionEnterprises"
    [totalElements]="totalElements"
    [pageSize]="pageSize"
    (onFilter)="handleFilter($event)"
    (onDeleteSelected)="handleDelete($event)"
    (onPage)="handlePageEvent($event)"
  ></app-position-enterprise-list-table>`,
})
export class PositionEnterpriseListPageComponent implements OnInit {
  positionEnterprises: CargoEmpresaResponseDTO[] = [];
    totalElements = 0;
    currentPage = 0;
    pageSize = 10;
    currentFilter: CargoEmpresaRequestDTO = {};

  constructor(
    private positionEnterpriseService: PositionEnterpriseService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.positionEnterpriseService.findAllPersons(this.currentFilter, this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.positionEnterprises = data.content;
         this.totalElements = data.totalElements;
      },
      error: (err) => console.error('Erro ao buscar pessoas', err),
    });
  }

  handleFilter(event: CargoEmpresaRequestDTO): void {
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
        this.positionEnterpriseService.deletePersonBatch(ids).subscribe({
          next: () => {
            this.snackBar.open('Cargos(s) excluída(s) com sucesso!', 'Fechar', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['success-snackbar'],
            });
            this.loadData();
          },
          error: (err) => {
            this.snackBar.open('Erro ao excluir registros.', 'Fechar', {
              duration: 3000,
            });
          },
        });
      }
    });
  }
}
