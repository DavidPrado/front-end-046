import { Component, EventEmitter, Input, Output,ViewChild, SimpleChanges, OnChanges } from '@angular/core';
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
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  EmpresaRequestDTO,
  EmpresaResponseDTO,
} from '../../../../core/models/enterprise.model';

@Component({
  selector: 'app-enterprise-list-table',
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
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  templateUrl: './enterprise-list-table.component.html',
  styleUrl: './enterprise-list-table.component.scss',
})
export class EnterpriseListTableComponent implements OnChanges{
  @Input() dataSource: EmpresaResponseDTO[] = [];
  @Input() totalElements: number = 0;
  @Input() pageSize: number = 10;
  @Output() onFilter = new EventEmitter<EmpresaResponseDTO>();
  @Output() onDeleteSelected = new EventEmitter<string[]>();
  @Output() onPage = new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  tableDataSource = new MatTableDataSource<EmpresaResponseDTO>([]);
  selection = new SelectionModel<EmpresaResponseDTO>(true, []);

  constructor(private router: Router) {}

  displayedColumns: string[] = [
    'select',
    'name', // Nome (contato/responsável)
    'corporateName', // Razão Social
    'fantasyName', // Nome Fantasia
    'cnpj', // CNPJ
    'email',
    'phone', // Telefone principal
    'uf',
    'city',
    'actions',
  ];

  filterValues: EmpresaRequestDTO = {};

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
    this.router.navigate(['/home/empresas/cadastro']);
  }

  editarEmpresa(pessoa: any) {
    this.router.navigate(['/home/empresas/cadastro', pessoa.id]);
  }
}
