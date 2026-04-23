import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../../../core/services/course.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  CursoRequestDTO,
  CursoResponseDTO,
} from '../../../../core/models/course.model';
import { CourseFormFieldsComponent } from '../../components/course-form-fields/course-form-fields.component';

@Component({
  selector: 'app-course-create-page',
  standalone: true,
  imports: [CourseFormFieldsComponent],
  template: `
    <app-course-form-fields
      [initialData]="courseData"
      [isEditMode]="isEditMode"
      (save)="handleSave($event)"
      (cancel)="handleBack()"
    ></app-course-form-fields>
  `,
  styles: [
    `
      .course-container {
        padding: 2rem;
      }
      .card-title {
        font-weight: 500;
        color: #333;
      }
    `,
  ],
})
export class CourseCreatePageComponent implements OnInit {
  private courseService = inject(CourseService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  courseData: CursoResponseDTO | null = null;
  isEditMode = false;
  courseId: string | null = null;

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('id');
    if (this.courseId) {
      this.isEditMode = true;
      this.loadCourse(this.courseId);
    }
  }

  loadCourse(id: string) {
    this.courseService.findById(id).subscribe({
      next: (data) => {
        this.courseData = data;
      },
      error: () => {
        this.snackBar.open('Erro ao carregar dados da pessoa.', 'Fechar', {
          duration: 3000,
        });
        this.handleBack();
      },
    });
  }

  handleBack() {
    this.router.navigate(['/home/cursos/list']);
  }

  handleSave(data: CursoRequestDTO) {
    const request =
      this.isEditMode && this.courseId
        ? this.courseService.update(this.courseId, data)
        : this.courseService.create(data);

    request.subscribe({
      next: () => {
        this.snackBar.open(
          `Pessoa ${this.isEditMode ? 'atualizada' : 'salva'} com sucesso!`,
          'Fechar',
          { duration: 3000 },
        );
        this.handleBack();
      },
      error: (err) => {
        const errorMessage =
          err.error?.message || 'Erro ao processar operação.';
        this.snackBar.open(errorMessage, 'Fechar', { duration: 5000 });
      },
    });
  }
}
