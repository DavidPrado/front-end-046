import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickActionsComponent } from '../../components/quick-actions/quick-actions.component';
import { NotificationsPanelComponent } from '../../components/notifications-panel/notifications-panel.component';
import { StatsOverviewComponent } from '../../components/stats-overview/stats-overview.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    CommonModule,
    QuickActionsComponent,
    NotificationsPanelComponent,
    StatsOverviewComponent
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent {

}
