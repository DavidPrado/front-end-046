import {Routes } from '@angular/router';
import { PositionEnterpriseListPageComponent } from './pages/position-enterprise-list-page/position-enterprise-list-page.component';
import { PositionEnterpriseCreatePageComponent } from './pages/position-enterprise-create-page/position-enterprise-create-page.component';

export const POSITION_ENTERPRISE_ROUTES: Routes = [
    { path: 'list', component: PositionEnterpriseListPageComponent },
    { path: 'cadastro', component: PositionEnterpriseCreatePageComponent },
    { path: 'cadastro/:id', component: PositionEnterpriseCreatePageComponent },
    { path: '', redirectTo: 'list', pathMatch: 'full' }
];