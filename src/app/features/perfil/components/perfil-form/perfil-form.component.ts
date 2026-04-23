import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';

import { RoleService } from '../../../../core/services/role.service';
import { Permission } from '../../../../core/models/permission.model';
import { PermissionService } from '../../../../core/services/permissions.service';
import { RoleResponseDTO, RoleRequestDTO } from '../../../../core/models/role.model';

@Component({
  selector: 'app-perfil-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatTableModule,
  ],
  templateUrl: './perfil-form.component.html',
  styleUrl: './perfil-form.component.scss',
})
export class PerfilFormComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'actions'];
  roleForm: FormGroup;
  isEditMode = false;
  roleId?: string;
  selectedPermissionIds = new Set<string>();
  dataSource = new MatTableDataSource<Permission>([]);
  allPermissions: Permission[] = [];

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private permissionService: PermissionService,
  ) {
    this.roleForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(8)]],
      permissionIds: [[], [Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnInit(): void {
    this.carregarPermissoes();
    this.roleId = this.route.snapshot.params['id'];

    if (this.roleId) {
      this.isEditMode = true;
      this.carregarDadosDoPerfil();
    }
  }

  carregarDadosDoPerfil() {
    this.roleService.findById(this.roleId!).subscribe({
      next: (role: RoleResponseDTO) => {
        this.roleForm.patchValue({
          name: role.name,
          description: role.description,
        });

        if (role.permissionIds) {
          this.selectedPermissionIds.clear();
          role.permissionIds.forEach((id) => this.selectedPermissionIds.add(id));
          
          this.atualizarFormularioPermissoes();
        }
      },
    });
  }

  togglePermission(id: string) {
    if (this.selectedPermissionIds.has(id)) {
      this.selectedPermissionIds.delete(id);
    } else {
      this.selectedPermissionIds.add(id);
    }

    this.atualizarFormularioPermissoes();
  }

  private atualizarFormularioPermissoes() {
    const ids = Array.from(this.selectedPermissionIds);
    this.roleForm.get('permissionIds')?.setValue(ids);
    this.roleForm.get('permissionIds')?.markAsDirty();
    this.roleForm.get('permissionIds')?.updateValueAndValidity();
  }

  filtrarPermissoes(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  carregarPermissoes() {
    this.permissionService.getPermissions('', 0, 100).subscribe({
      next: (perms) => {
        this.allPermissions = perms;
        this.dataSource.data = perms;
      },
      error: () => this.mostrarMensagem('Erro ao carregar lista de permissões'),
    });
  }

  salvar() {
    if (this.roleForm.invalid) {
      this.mostrarMensagem('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const payload: RoleRequestDTO = this.roleForm.value;

    const request = this.isEditMode
      ? this.roleService.update(this.roleId!, payload)
      : this.roleService.create(payload);

    request.subscribe({
      next: () => {
        this.mostrarMensagem(
          `Perfil ${this.isEditMode ? 'atualizado' : 'criado'} com sucesso!`,
        );
        this.router.navigate(['/home/perfil-list']);
      },
      error: (err) => this.mostrarMensagem('Erro ao salvar perfil.'),
    });
  }

  private mostrarMensagem(msg: string) {
    this.snackBar.open(msg, 'Fechar', { duration: 3000 });
  }
}