import {Routes } from '@angular/router';
import { CourseListPageComponent } from './pages/course-list-page/course-list-page.component';
import { CourseCreatePageComponent } from './pages/course-create-page/course-create-page.component';

export const COURSE_ROUTES: Routes = [
    { path: 'list', component: CourseListPageComponent },
    { path: 'cadastro', component: CourseCreatePageComponent },
    { path: 'cadastro/:id', component: CourseCreatePageComponent },
    { path: '', redirectTo: 'list', pathMatch: 'full' }
];