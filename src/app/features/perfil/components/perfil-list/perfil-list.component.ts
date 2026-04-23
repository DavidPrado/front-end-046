import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDividerModule } from '@angular/material/divider';

import { RoleService } from '../../../../core/services/role.service';
import {
  RoleRequestDTO,
  RoleResponseDTO,
} from '../../../../core/models/role.model';

@Component({
  selector: 'app-perfil-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatDividerModule,
  ],
  templateUrl: './perfil-list.component.html',
  styleUrl: './perfil-list.component.scss',
})
export class PerfilListComponent implements OnInit {
  displayedColumns: string[] = ['select', 'nome', 'description', 'acoes'];

  filterValues = {
    name: null,
    description: null,
  };

  dataSource = new MatTableDataSource<RoleResponseDTO>([]);
  selection = new SelectionModel<RoleResponseDTO>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private roleService: RoleService,
  ) {}

  ngOnInit() {
    this.carregarPerfils();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  carregarPerfils() {
    this.roleService
      .findAllRoles(this.filterValues, 0, 100, 'name', 'ASC')
      .subscribe({
        next: (roles) => {
          this.dataSource.data = roles;
          this.selection.clear();
        },
        error: (err) => console.error('Erro ao buscar perfils:', err),
      });
  }

  irParaCadastro() {
    this.router.navigate(['/home/perfil-cadastro']);
  }

  deletarSelecionados() {
    const selecionados = this.selection.selected;
    if (selecionados.length === 0) return;

    if (
      confirm(`Deseja excluir os ${selecionados.length} usuários selecionados?`)
    ) {
      const ids = selecionados
        .map((r) => r.id?.toString())
        .filter((id): id is string => !!id);

      this.roleService.deleteRoleBatch(ids).subscribe({
        next: () => {
          this.selection.clear();
          this.carregarPerfils();
        },
        error: (err) => alert('Erro ao excluir Perfils'),
      });
    }
  }

  limparFiltros() {
    this.filterValues = {
      name: null,
      description: null,
    };
    this.carregarPerfils();
  }

  filtrar() {
    this.carregarPerfils();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  editarPerfil(perfil: RoleResponseDTO) {
    this.router.navigate(['/home/perfil-cadastro', perfil.id]);
  }
}
