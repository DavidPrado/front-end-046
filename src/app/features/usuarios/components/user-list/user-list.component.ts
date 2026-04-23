import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

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

import { UserService } from '../../../../core/services/user.service'; // Ajuste o caminho conforme seu projeto
import {
  UserListRequestDTO,
  UserListResponseDTO,
} from '../../../../core/models/user.model'; // Movi a interface para um arquivo próprio
import { MatDividerModule } from '@angular/material/divider';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

import { FormsModule } from '@angular/forms'; // 1. IMPORTANTE: Adicione este import
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,       
    MatSelectModule,
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
    NgxMaskPipe,
    NgxMaskDirective
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {

  displayedColumns: string[] = [
    'select',
    'nome',
    'email',
    'status',
    'cpf',
    'phoneNumber',
    'createdAt',
    'updatedAt',
    'acoes',
  ];

  filterValues: UserListRequestDTO = {
    code: null,
    name: '',
    email: '',
    cpf: '',
    phoneNumber: '',
    active: null,
    mustChangePassword: null,
    birthDate: null
  };

  dataSource = new MatTableDataSource<UserListResponseDTO>([]);
  selection = new SelectionModel<UserListResponseDTO>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.carregarUsuarios();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

carregarUsuarios() {

    this.userService.findAllUsers(this.filterValues, 0, 100, 'createdAt', 'DESC').subscribe({
      next: (usuarios) => {
        this.dataSource.data = usuarios;
        this.selection.clear(); 
      },
      error: (err) => console.error('Erro ao buscar usuários:', err),
    });
  }

  filtrar() {
    this.carregarUsuarios();
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

  deletarSelecionados() {
    const selecionados = this.selection.selected;
    if (selecionados.length === 0) return;

    if (
      confirm(`Deseja excluir os ${selecionados.length} usuários selecionados?`)
    ) {
      const ids = selecionados
        .map((u) => u.id?.toString())
        .filter((id): id is string => !!id);

      this.userService.deleteUsersBatch(ids).subscribe({
        next: () => {
          this.selection.clear();
          this.carregarUsuarios();
        },
        error: (err) => alert('Erro ao excluir usuários.'),
      });
    }
  }

  irParaCadastro() {
    this.router.navigate(['/home/usuarios-cadastro']);
  }

  editarUsuario(usuario: UserListResponseDTO) {
    this.router.navigate(['/home/usuarios-cadastro', usuario.id]);
  }

  limparFiltros() {
    this.filterValues = {
      code: null,
      name: '',
      email: '',
      cpf: '',
      phoneNumber: '',
      active: null,
      mustChangePassword: null,
      birthDate: null
    };
    this.carregarUsuarios();
  }
}
