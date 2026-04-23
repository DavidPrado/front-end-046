import {Routes } from '@angular/router';
import { PersonListPageComponent } from './pages/person-list-page/person-list-page.component';
import { PersonCreatePageComponent } from './pages/person-create-page/person-create-page.component';

export const PERSON_ROUTES: Routes = [
    { path: 'list', component: PersonListPageComponent },
    { path: 'cadastro', component: PersonCreatePageComponent },
    { path: 'cadastro/:id', component: PersonCreatePageComponent },
    { path: '', redirectTo: 'list', pathMatch: 'full' }
];