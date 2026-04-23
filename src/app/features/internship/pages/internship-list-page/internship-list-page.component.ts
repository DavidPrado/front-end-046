import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../../confirmation/confirmation-dialog.component';
import { InternshipService } from '../../../../core/services/internship.service';
import {
  EstagioRequestListDTO,
  EstagioResponseDTO,
} from '../../../../core/models/internship.model';
import { InternshipListTableComponent } from '../../components/internship-list-table/internship-list-table.component';

@Component({
  selector: 'app-internship-list-page',
  standalone: true,
  imports: [CommonModule, 
    InternshipListTableComponent],
  template:  `
    <app-internship-list-table
      [dataSource]="internships"
      [totalElements]="totalElements"
      [pageSize]="pageSize"
      (onFilter)="handleFilter($event)"
      (onDeleteSelected)="handleDelete($event)"
      (onPage)="handlePageEvent($event)"
    >
    </app-internship-list-table>
  `,
})
export class InternshipListPageComponent implements OnInit {
  internships: EstagioResponseDTO[] = [];
  totalElements = 0;
  currentPage = 0;
  pageSize = 10;
  currentFilter: EstagioRequestListDTO = {};

  constructor(
    private internshipService: InternshipService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

   ngOnInit(): void {
    this.loadData();
  }

  
  loadData(): void {
    this.internshipService
      .findAllEstagiosView(this.currentFilter, this.currentPage, this.pageSize)
      .subscribe({
        next: (response) => {
          this.internships = response.content;
          this.totalElements = response.totalElements;
        },
        error: (err) => console.error('Erro ao buscar estagios', err),
      });
  }

    handleFilter(event: EstagioRequestListDTO): void {
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
        this.internshipService.deleteInternshipBatch(ids).subscribe({
          next: () => {
            this.snackBar.open('Estagio(s) excluído(s) com sucesso!', 'Fechar', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['success-snackbar'], 
            });
            this.loadData();
          },
          error: () => {
            this.snackBar.open('Erro ao excluir registros.', 'Fechar', {
              duration: 3000,
            });
          },
        });
      }
    });
  }
}
