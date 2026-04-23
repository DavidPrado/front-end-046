import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss', // Reutilize o mesmo SCSS da tela anterior
})
export class ResetPasswordComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  loading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  resetForm: FormGroup = this.fb.group({
    token: ['', [Validators.required]],
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
  });

  onSubmit() {
    if (this.resetForm.valid) {
      this.loading = true;
      this.errorMessage = null;
      this.successMessage = null; 

      const payload = this.resetForm.value;

      this.authService.resetPassword(payload).subscribe({
        next: (res) => {
          this.loading = false;
          this.successMessage = 'Senha alterada com sucesso! Redirecionando...';

          setTimeout(() => this.router.navigate(['/login']), 3000);
        },
        error: (err) => {
          this.loading = false;
          console.error('Erro no Reset:', err);


          if (err.status === 400 || err.status === 404) {
            this.errorMessage = 'Token inválido ou expirado.';
          } else {
            this.errorMessage = 'Erro ao processar a troca de senha.';
          }
        },
      });
    }
  }
}
