import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { UserService } from '../../../../core/services/user.service';
import { NgxMaskDirective } from 'ngx-mask';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RoleService } from '../../../../core/services/role.service';

@Component({
  selector: 'app-user-form',
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
    NgxMaskDirective,
    MatDividerModule,
    MatSlideToggleModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isEditMode = false;
  userId?: string;
  hidePassword = true;

  allRoles: any[] = [];
  userRoles: string[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private roleService: RoleService,
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      cpf: ['', [Validators.required]],
      phoneNumber: [''],
      perfil: ['USER', Validators.required],
      birthDate: ['', [Validators.required]],
      active: [true],
      mustChangePassword: [false],
      rolesIds: [[], Validators.required],
    });
  }

  ngOnInit(): void {
    this.carregarTodasAsRoles();
    this.userId = this.route.snapshot.params['id'];

    if (this.userId) {
      this.isEditMode = true;
      this.userForm.get('password')?.setValidators([Validators.minLength(6)]);
      this.carregarDadosUsuario(this.userId);
    } else {
      this.isEditMode = false;
      this.userForm
        .get('password')
        ?.setValidators([Validators.required, Validators.minLength(6)]);
    }
    this.userForm.get('password')?.updateValueAndValidity();
  }

  carregarTodasAsRoles() {
    this.roleService.findAll().subscribe({
      next: (roles) => (this.allRoles = roles),
      error: () => this.mostrarMensagem('Erro ao carregar lista de perfils'),
    });
  }

  carregarDadosUsuario(id: string) {
    this.userService.findById(id).subscribe({
      next: (user) => {
        if (user.birthDate) {
          const [ano, mes, dia] = (user.birthDate as any).split('-');
          user.birthDate = `${dia}/${mes}/${ano}`;
        }

        this.userService.getUserRoles(id).subscribe(rolesPage => {
          const ids = rolesPage.content.map((r: any) => r.id);
          this.userForm.patchValue({ ...user, rolesIds: ids });
        });
      },
      error: () => this.mostrarMensagem('Erro ao carregar usuário'),
    });
  }

  salvar() {
    if (this.userForm.invalid) return;

    const rawData = this.userForm.value;

    const payload = {
      name: rawData.name,
      email: rawData.email,
      password: rawData.password,
      active: rawData.active,
      cpf: rawData.cpf,
      phoneNumber: rawData.phoneNumber,
      birthDate: rawData.birthDate,
      mustChangePassword: rawData.mustChangePassword,
      roles: rawData.rolesIds,
    };

    const request = this.isEditMode
      ? this.userService.update(this.userId!, payload)
      : this.userService.create(payload);

    request.subscribe({
      next: () => {
        if(this.isEditMode){
          this.userService.updateUserRoles(this.userId!, rawData.rolesIds).subscribe();
        }

        this.mostrarMensagem(
          `Usuário ${this.isEditMode ? 'atualizado' : 'criado '} com sucesso!`,
        );
        this.router.navigate(['/home/usuarios-list']);
      },
      error: (err) => this.mostrarMensagem('Erro ao salvar usuário.'),
    });
  }

  private mostrarMensagem(msg: string) {
    this.snackBar.open(msg, 'Fechar', { duration: 3000 });
  }
}
