import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-developing',
  standalone: true,
  imports: [MatCardModule, 
    MatIconModule, 
    MatButtonModule, 
    MatProgressBarModule,
    RouterModule],
  templateUrl: './developing.component.html',
  styleUrl: './developing.component.scss'
})
export class DevelopingComponent {

}
