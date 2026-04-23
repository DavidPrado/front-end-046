import {Routes } from '@angular/router';
import { SchoolListPageComponent } from './pages/school-list-page/school-list-page.component';
import { SchoolCreatePageComponent } from './pages/school-create-page/school-create-page.component';


export const SCHOOL_ROUTES: Routes = [
    { path: 'list', component: SchoolListPageComponent },
    { path: 'cadastro', component: SchoolCreatePageComponent },
    { path: 'cadastro/:id', component: SchoolCreatePageComponent },
    { path: '', redirectTo: 'list', pathMatch: 'full' }
];