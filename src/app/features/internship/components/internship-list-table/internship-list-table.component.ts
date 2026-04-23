import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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
  EstagioRequestDTO,
  EstagioRequestListDTO,
  EstagioResponseDTO,
} from '../../../../core/models/internship.model';

@Component({
  selector: 'app-internship-list-table',
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
    DatePipe,
  ],
  templateUrl: './internship-list-table.component.html',
  styleUrl: './internship-list-table.component.scss',
})
export class InternshipListTableComponent implements OnChanges {
  @Input() dataSource: EstagioResponseDTO[] = [];
  @Input() totalElements: number = 0;
  @Input() pageSize: number = 10;
  @Output() onFilter = new EventEmitter<EstagioRequestListDTO>();
  @Output() onDeleteSelected = new EventEmitter<string[]>();
  @Output() onPage = new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  tableDataSource = new MatTableDataSource<EstagioResponseDTO>([]);
  selection = new SelectionModel<EstagioResponseDTO>(true, []);

  constructor(private router: Router) {}

  displayedColumns: string[] = [
    'select',
    'studentName',
    'studentCpf',
    'enterpriseName',
    'enterpriseCnpj',
    'startDate',
    'endDate',
    'terminationContract',
    'hoursPerWeek',
    'actions',
  ];

  filterValues: EstagioRequestListDTO = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSource'] && this.dataSource) {
      this.tableDataSource.data = this.dataSource;
    }
  }

  onPageChange(event: any) {
    this.onPage.emit(event);
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
    this.filterValues = { vencimento30Dias: false };
    this.onFilter.emit(this.filterValues);
  }

  isPrestesAVencer(endDate: string | Date): boolean {
    if (!endDate) return false;
    const dataFim = new Date(endDate);
    const hoje = new Date();
    const diffTime = dataFim.getTime() - hoje.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays >= 0;
  }

  filtrarProximos30Dias() {
    this.filterValues.vencimento30Dias = true;
    this.emitirFiltro();
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
    this.router.navigate(['/home/estagios/cadastro']);
  }

  editar(estagios: any) {
    this.router.navigate(['/home/estagios/cadastro', estagios.id]);
  }
}
