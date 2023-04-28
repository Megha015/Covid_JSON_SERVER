import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

import { ApiService } from '../api.service';
import { Statistic } from '../Statistic';

@Component({
  selector: 'app-cases-stat',
  templateUrl: './case-stat.component.html',
  styleUrls: ['./case-stat.component.scss'],
})
export class CasesStatComponent implements OnInit {
  stats: Statistic[] = [];
  label = 'Positive';
  isLoadingResults = true;
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: ChartType[] = [];
  barChartType: ChartType = 'bar' as ChartType;

  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataset[] = [
    { data: [], backgroundColor: [], label: this.label },
  ];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getStatistic(this.label);
  }

  getStatistic(status: string) {
    this.barChartData = [{ data: [], backgroundColor: [], label: this.label }];
    this.barChartLabels = [];
    this.api.getStatistic(status).subscribe(
      (res: any) => {
        this.stats = res;
        const chartdata: number[] = [];
        const chartcolor: string[] = [];
        this.stats.forEach((stat) => {
          this.barChartLabels.push(stat.id.date);
          chartdata.push(stat.count);
          if (this.label === 'Positive') {
            chartcolor.push('rgba(255, 165, 0, 0.5)');
          } else if (this.label === 'Dead') {
            chartcolor.push('rgba(255, 0, 0, 0.5)');
          } else {
            chartcolor.push('rgba(0, 255, 0, 0.5)');
          }
        });
        this.barChartData = [
          { data: chartdata, backgroundColor: chartcolor, label: this.label },
        ];
        this.isLoadingResults = false;
      },
      (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }

  changeStatus() {
    this.isLoadingResults = true;
    this.getStatistic(this.label);
  }
}
