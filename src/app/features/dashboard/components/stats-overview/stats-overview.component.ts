import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../../../core/services/dashboard.service';
import { DashboardStats } from '../../../../core/models/dashboard.model';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-stats-overview',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './stats-overview.component.html',
  styleUrl: './stats-overview.component.scss'
})
export class StatsOverviewComponent implements OnInit {
  
  public lastUpdate: Date | null = null;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { 
        beginAtZero: true,
        ticks: { stepSize: 1 } 
      }
    },
    plugins: {
      legend: { display: false },
      title: { display: false }
    }
  };

  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { 
        data: [], 
        label: 'Quantidade',
        backgroundColor: '#1a237e', 
        borderRadius: 6
      }
    ]
  };

  constructor(private service: DashboardService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.service.getStats().subscribe({
      next: (data: DashboardStats[]) => {
        if (data && data.length > 0) {
          this.lastUpdate = new Date(data[0].updatedAt);
          
          this.barChartData.labels = data.map(item => item.metricName);
          this.barChartData.datasets[0].data = data.map(item => item.metricValue);

          this.barChartData = { ...this.barChartData };
        }
      },
      error: (err) => console.error('Erro ao buscar estatísticas:', err)
    });
  }
}