import { Component, EventEmitter, Input, Output } from '@angular/core';
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
import { NgxMaskPipe } from 'ngx-mask';
import { SelectionModel } from '@angular/cdk/collections';
import {
  EscolaRequestDTO,
  EscolaResponseDTO,
} from '../../../../core/models/school.model';

@Component({
  selector: 'app-school-list-table',
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
    NgxMaskPipe,
  ],
  templateUrl: './school-list-table.component.html',
  styleUrl: './school-list-table.component.scss',
})
export class SchoolListTableComponent {
  @Input() dataSource: EscolaResponseDTO[] = [];
  @Output() onFilter = new EventEmitter<EscolaResponseDTO>();
  @Output() onDeleteSelected = new EventEmitter<string[]>();

  selection = new SelectionModel<EscolaResponseDTO>(true, []);

  constructor(private router: Router) {}

  displayedColumns: string[] = [
    'select',
    'name',
    'code',
    'email',
    'phone',
    'uf',
    'city',
    'actions',
  ];

  filterValues: EscolaRequestDTO = {};

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
    this.router.navigate(['/home/escolas/cadastro']);
  }

  editarEscola(pessoa: any) {
    this.router.navigate(['/home/escolas/cadastro', pessoa.id]);
  }
}
