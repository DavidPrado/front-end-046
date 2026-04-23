import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface QuickAction {
  label: string;
  icon: string;
  route: string;
  description: string;
  color: string;
}

@Component({
  selector: 'app-quick-actions',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatIconModule],
  templateUrl: './quick-actions.component.html',
  styleUrl: './quick-actions.component.scss'
})
export class QuickActionsComponent {

  actions: QuickAction[] = [
    { 
      label: 'Novo Usuário', 
      icon: 'person_add', 
      route: '/home/usuarios-cadastro', 
      description: 'Acesso ao sistema',
      color: '#1976d2' 
    },
    { 
      label: 'Nova Pessoa', 
      icon: 'person', 
      route: '/home/pessoas/cadastro', 
      description: 'Alunos e professores',
      color: '#388e3c' 
    },
    { 
      label: 'Nova Empresa', 
      icon: 'business', 
      route: '/home/empresas/cadastro', 
      description: 'Parceiros de estágio',
      color: '#fbc02d' 
    },
    { 
      label: 'Novo Curso', 
      icon: 'menu_book', 
      route: '/home/cursos/cadastro', 
      description: 'Cursos da ETEC',
      color: '#7b1fa2' 
    },
    { 
      label: 'Novo Cargo', 
      icon: 'work', 
      route: '/home/cargos/cadastro', 
      description: 'Cargos de empresa',
      color: '#455a64' 
    },
    { 
      label: 'Novo Estágio', 
      icon: 'assignment_ind', 
      route: '/home/estagios/cadastro', 
      description: 'Termos e contratos',
      color: '#d32f2f' 
    }
  ];

}
