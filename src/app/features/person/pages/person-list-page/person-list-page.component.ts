import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonListTableComponent } from '../../components/person-list-table/person-list-table.component';
import {
  PersonRequestDTO,
  PersonResponseDTO,
} from '../../../../core/models/person.model';
import { PersonService } from '../../../../core/services/person.service';
import { ConfirmationDialogComponent } from '../../../confirmation/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-person-list-page',
  standalone: true,
  imports: [CommonModule, PersonListTableComponent],
  template: `
    <app-person-list-table
      [dataSource]="persons"
      [totalElements]="totalElements"
      [pageSize]="pageSize"
      (onFilter)="handleFilter($event)"
      (onDeleteSelected)="handleDelete($event)"
      (onPage)="handlePageEvent($event)"
    >
    </app-person-list-table>
  `,
})
export class PersonListPageComponent implements OnInit {
  persons: PersonResponseDTO[] = [];
  totalElements = 0;
  currentPage = 0;
  pageSize = 10;
  currentFilter: PersonRequestDTO = {};

  constructor(
    private personService: PersonService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.personService
      .findAllPersons(this.currentFilter, this.currentPage, this.pageSize)
      .subscribe({
        next: (response) => {
          this.persons = response.content;
          this.totalElements = response.totalElements;
        },
        error: (err) => console.error('Erro ao buscar pessoas', err),
      });
  }

  handleFilter(event: PersonRequestDTO): void {
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
        this.personService.deletePersonBatch(ids).subscribe({
          next: () => {
            this.snackBar.open('Pessoa(s) excluída(s) com sucesso!', 'Fechar', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['success-snackbar'], // Você pode estilizar no CSS
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
