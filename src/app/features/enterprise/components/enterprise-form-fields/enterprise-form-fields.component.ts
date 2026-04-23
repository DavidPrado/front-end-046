import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmpresaRequestDTO } from '../../../../core/models/enterprise.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { NgxMaskDirective } from 'ngx-mask';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-enterprise-form-fields',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    NgxMaskDirective,
    MatDividerModule,
    MatIconModule,
    MatSelectModule,
    CommonModule,
  ],
  templateUrl: './enterprise-form-fields.component.html',
  styleUrl: './enterprise-form-fields.component.scss',
})
export class EnterpriseFormFieldsComponent implements OnChanges {
  private fb = inject(FormBuilder);

  @Input() initialData: EmpresaRequestDTO | null = null;
  @Input() isEditMode = false;

  @Output() save = new EventEmitter<EmpresaRequestDTO>();
  @Output() cancel = new EventEmitter<void>();

  readonly states = [
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MT',
    'MS',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO',
  ];

  form = this.fb.group({
    name: ['', Validators.required],
    cnpj: ['', Validators.required],
    email: [''],
    phone: [''],
    uf: [''],
    city: [''],
    neighborhood: [''],
    street: [''],
    cep: [''],
    number: [''],
    complement: [''],
    stateRegistration: ['', [Validators.maxLength(14), Validators.pattern(/^[a-zA-Z0-9]*$/)]],
    municipalRegistration: ['', [Validators.maxLength(15), Validators.pattern(/^[a-zA-Z0-9]*$/)]],
    corporateName: ['', Validators.required],
    fantasyName: ['', Validators.required],
    cnae: ['', [Validators.maxLength(8), Validators.pattern(/^[a-zA-Z0-9]*$/)]],
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialData'] && this.initialData) {
      this.form.patchValue(this.initialData);
    }
  }

  submit() {
    if (this.form.valid) {
      this.save.emit(this.form.value as EmpresaRequestDTO);
    }
  }
}
