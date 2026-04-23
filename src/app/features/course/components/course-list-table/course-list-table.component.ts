import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {
  CursoRequestDTO,
  CursoResponseDTO,
} from '../../../../core/models/course.model';

@Component({
  selector: 'app-course-list-table',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    MatDividerModule,
  ],
  templateUrl: './course-list-table.component.html',
  styleUrl: './course-list-table.component.scss',
})
export class CourseListTableComponent implements OnChanges {
  @Input() dataSource: CursoResponseDTO[] = [];
  @Input() totalElements: number = 0;
  @Input() pageSize: number = 10;
  @Output() onFilter = new EventEmitter<CursoRequestDTO>();
  @Output() onDeleteSelected = new EventEmitter<string[]>();
  @Output() onPage = new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  tableDataSource = new MatTableDataSource<CursoResponseDTO>([]);
  selection = new SelectionModel<CursoResponseDTO>(true, []);

  constructor(private router: Router) {}

  displayedColumns: string[] = [
    'select',
    'name',
    'description',
    'status',
    'actions',
  ];

  filterValues: CursoRequestDTO = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSource'] && this.dataSource) {
      this.tableDataSource.data = this.dataSource;
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.forEach((row) => this.selection.select(row));
  }

  limparFiltros() {
    this.filterValues = {};
    this.onFilter.emit(this.filterValues);
  }

  emitirFiltro() {
    this.onFilter.emit(this.filterValues);
  }

  emitirExcluir() {
    const ids = this.selection.selected.map((p) => p.id!);
    this.onDeleteSelected.emit(ids);
    this.selection.clear();
  }

  irParaCadastro() {
    this.router.navigate(['/home/cursos/cadastro']);
  }

  editarPessoa(curso: any) {
    this.router.navigate(['/home/cursos/cadastro', curso.id]);
  }

  onPageChange(event: any) {
    this.onPage.emit(event);
  }
}
