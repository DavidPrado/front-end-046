import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { UserFormComponent } from './features/usuarios/components/user-form/user-form.component';
import { UserListComponent } from './features/usuarios/components/user-list/user-list.component';
import { ForgotPasswordComponent } from './features/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './features/auth/reset-password/reset-password.component';
import { PerfilListComponent } from './features/perfil/components/perfil-list/perfil-list.component';
import { PerfilFormComponent } from './features/perfil/components/perfil-form/perfil-form.component';
import { DevelopingComponent } from './features/settings/components/developing/developing.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.routes').then(
            (m) => m.DASHBOARD_ROUTES,
          ),
      },
      { path: 'usuarios-list', component: UserListComponent },
      { path: 'usuarios-cadastro', component: UserFormComponent },
      { path: 'usuarios-cadastro/:id', component: UserFormComponent },
      { path: 'perfil-list', component: PerfilListComponent },
      { path: 'perfil-cadastro', component: PerfilFormComponent },
      { path: 'perfil-cadastro/:id', component: PerfilFormComponent },
      { path: 'configuracoes', component: DevelopingComponent },
      {
        path: 'pessoas',
        loadChildren: () =>
          import('./features/person/person.routes').then(
            (m) => m.PERSON_ROUTES,
          ),
      },
      {
        path: 'empresas',
        loadChildren: () =>
          import('./features/enterprise/enterprise.routes').then(
            (m) => m.ENTERPRISE_ROUTES,
          ),
      },
      {
        path: 'cursos',
        loadChildren: () =>
          import('./features/course/course.routes').then(
            (m) => m.COURSE_ROUTES,
          ),
      },
      {
        path: 'cargos',
        loadChildren: () =>
          import('./features/position-enterprise/position-enterprise.routes').then(
            (m) => m.POSITION_ENTERPRISE_ROUTES,
          ),
      },
      {
        path: 'escolas',
        loadChildren: () =>
          import('./features/school/school.route').then((m) => m.SCHOOL_ROUTES),
      },
      {
        path: 'estagios',
        loadChildren: () =>
          import('./features/internship/internship.route').then(
            (m) => m.INTERNSHIP_ROUTES,
          ),
      },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
