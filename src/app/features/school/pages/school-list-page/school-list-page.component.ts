import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../../confirmation/confirmation-dialog.component';
import {
  EscolaRequestDTO,
  EscolaResponseDTO,
} from '../../../../core/models/school.model';
import { SchoolService } from '../../../../core/services/school.service';
import { SchoolListTableComponent } from '../../components/school-list-table/school-list-table.component'

@Component({
  selector: 'app-school-list-page',
  standalone: true,
  imports: [CommonModule, SchoolListTableComponent],
  template:`
      <app-school-list-table
      [dataSource]="schools"
      (onFilter)="handleFilter($event)"
      (onDeleteSelected)="handleDelete($event)"
    >
      ></app-school-list-table
    >
  `
})
export class SchoolListPageComponent implements OnInit {
  schools: EscolaResponseDTO[] = [];

  constructor(
    private schoolService: SchoolService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(filter: EscolaRequestDTO = {}): void {
    this.schoolService.findAllSchools(filter).subscribe({
      next: (data) => (this.schools = data),
      error: (err) => console.error('Erro ao buscar escolas', err),
    });
  }

  handleFilter(event: EscolaRequestDTO): void {
    this.loadData(event);
  }

  handleDelete(ids: string[]): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { message: `Deseja realmente excluir ${ids.length} registro(s)?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.schoolService.deleteSchoolBatch(ids).subscribe({
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
