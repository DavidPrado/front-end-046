import { Routes } from '@angular/router';
import { EnterpriseListPageComponent } from './pages/enterprise-list-page/enterprise-list-page.component';
import { EnterpriseCreatePageComponent } from './pages/enterprise-create-page/enterprise-create-page.component';

export const ENTERPRISE_ROUTES: Routes = [
  { path: 'list', component: EnterpriseListPageComponent },
  { path: 'cadastro', component: EnterpriseCreatePageComponent },
  { path: 'cadastro/:id', component: EnterpriseCreatePageComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
];
