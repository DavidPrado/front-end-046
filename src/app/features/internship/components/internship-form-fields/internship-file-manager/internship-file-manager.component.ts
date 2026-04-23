import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { InternshipFileService } from '../../../../../core/services/internship-file.service';
import { EstagioDescArquivoResponseDTO } from '../../../../../core/models/internship-desc-file.model';
import { UploadResponseDTO } from '../../../../../core/models/upload-response.model';

@Component({
  selector: 'app-internship-file-manager',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
  ],
  templateUrl: './internship-file-manager.component.html',
})
export class InternshipFileManagerComponent implements OnInit {
  private fb = inject(FormBuilder);
  private fileService = inject(InternshipFileService);
  private snackBar = inject(MatSnackBar);

  @Input() internshipId: string | null = null;

  files: EstagioDescArquivoResponseDTO[] = [];
  uploading = false;

  uploadForm: FormGroup = this.fb.group({
    uploads: this.fb.array([]),
  });

  ngOnInit() {
    this.loadFiles();
  }

  get uploads() {
    return this.uploadForm.get('uploads') as FormArray;
  }

  loadFiles() {
    if (this.internshipId) {
      this.fileService.getFilesByInternship(this.internshipId).subscribe({
        next: (res) => (this.files = res),
        error: () => this.snackBar.open('Erro ao carregar arquivos', 'OK'),
      });
    }
  }

  addUploadRow() {
    const row = this.fb.group({
      description: ['', Validators.required],
      fileList: [null as FileList | null, Validators.required],
      fileNameLabel: [''],
    });
    this.uploads.push(row);
  }

  removeUploadRow(index: number) {
    this.uploads.removeAt(index);
  }

  onFileSelected(event: any, index: number) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      const label =
        files.length > 1
          ? `${files.length} arquivos selecionados`
          : files[0].name;

      this.uploads.at(index).patchValue({
        fileList: files,
        fileNameLabel: label,
      });
    }
  }

  executeUpload(index: number) {
    const row = this.uploads.at(index).value;
    if (!this.internshipId || !row.fileList) return;

    this.uploading = true;
    const filesArray = Array.from(row.fileList as FileList);

    this.fileService
      .upload(this.internshipId, row.description, filesArray)
      .subscribe({
        next: (responses: UploadResponseDTO[]) => {
          const fileName = responses[0]?.fileName || 'Arquivo';
          this.snackBar.open('Upload concluído com sucesso!', 'OK', {
            duration: 3000,
          });
          this.removeUploadRow(index);
          this.loadFiles();
          this.uploading = false;
        },
        error: (err) => {
          this.uploading = false;
          this.snackBar.open('Erro ao realizar upload', 'Fechar');
          console.error(err);
        },
      });
  }

  download(file: EstagioDescArquivoResponseDTO) {
    if (!file.id) return;

    this.fileService.download(file.id).subscribe((blob) => {
      const safeBlob = new Blob([blob], { type: file.mimeType });
      const url = window.URL.createObjectURL(safeBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  deleteFile(id: string) {
    if (confirm('Tem certeza que deseja excluir este arquivo?')) {
      this.fileService.delete(id).subscribe({
        next: () => {
          this.snackBar.open('Arquivo removido com sucesso', 'OK', {
            duration: 3000,
          });
          this.loadFiles(); // Recarrega a lista
        },
        error: () => this.snackBar.open('Erro ao excluir arquivo', 'Fechar'),
      });
    }
  }
}
