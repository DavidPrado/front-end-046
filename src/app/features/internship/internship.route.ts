import { Routes } from '@angular/router';
import { InternshipListPageComponent } from './pages/internship-list-page/internship-list-page.component';
import { InternshipCreatePageComponent } from './pages/internship-create-page/internship-create-page.component';

export const INTERNSHIP_ROUTES: Routes = [
        { path: 'list', component: InternshipListPageComponent },
        { path: 'cadastro', component: InternshipCreatePageComponent },
        { path: 'cadastro/:id', component: InternshipCreatePageComponent },
        { path: '', redirectTo: 'list', pathMatch: 'full' }
]