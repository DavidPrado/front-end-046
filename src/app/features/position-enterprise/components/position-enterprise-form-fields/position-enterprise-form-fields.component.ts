import {
  Component,
  EventEmitter,
  Output,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CargoEmpresaRequestDTO } from '../../../../core/models/position-enterprise.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-position-enterprise-form-fields',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatSelectModule,
    MatSlideToggleModule,
  ],
  templateUrl: './position-enterprise-form-fields.component.html',
  styleUrl: './position-enterprise-form-fields.component.scss',
})
export class PositionEnterpriseFormFieldsComponent implements OnChanges {
  private fb = inject(FormBuilder);

  @Input() initialData: CargoEmpresaRequestDTO | null = null;
  @Input() isEditMode = false;

  @Output() save = new EventEmitter<CargoEmpresaRequestDTO>();
  @Output() cancel = new EventEmitter<void>();

  form = this.fb.group({
    position: ['', [Validators.required]],
    description: [''],
    active: [true],
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialData'] && this.initialData) {
      this.form.patchValue(this.initialData);
    }
  }

  submit() {
    if (this.form.valid) {
      this.save.emit(this.form.value as CargoEmpresaRequestDTO);
    }
  }
}
