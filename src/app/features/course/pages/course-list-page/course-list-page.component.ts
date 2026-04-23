import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseListTableComponent } from '../../components/course-list-table/course-list-table.component';
import {
  CursoRequestDTO,
  CursoResponseDTO,
} from '../../../../core/models/course.model';
import { ConfirmationDialogComponent } from '../../../confirmation/confirmation-dialog.component';
import { CourseService } from '../../../../core/services/course.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-list-page',
  standalone: true,
  imports: [CommonModule, CourseListTableComponent],
  template: `
    <app-course-list-table
      [dataSource]="courses"
      [totalElements]="totalElements"
      [pageSize]="pageSize"
      (onFilter)="handleFilter($event)"
      (onDeleteSelected)="handleDelete($event)"
      (onPage)="handlePageEvent($event)"
    >
    </app-course-list-table>
  `,
})
export class CourseListPageComponent implements OnInit {
  courses: CursoResponseDTO[] = [];
  totalElements = 0;
  currentPage = 0;
  pageSize = 10;
  currentFilter: CursoRequestDTO = {};

  constructor(
    private courseService: CourseService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.courseService
      .findAllCourses(this.currentFilter, this.currentPage, this.pageSize)
      .subscribe({
        next: (data) => {
          this.courses = data.content;
          this.totalElements = data.totalElements;
        },
        error: (err) => console.error('Erro ao buscar cursos', err),
      });
  }

  handleFilter(event: CursoRequestDTO): void {
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
        this.courseService.deleteCourseBatch(ids).subscribe({
          next: () => {
            this.snackBar.open('Cursos(s) excluída(s) com sucesso!', 'Fechar', {
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
