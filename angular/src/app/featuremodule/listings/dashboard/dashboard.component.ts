import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Local } from 'src/app/models/Local';
import { LocalService } from 'src/app/services/local.service';
import { Chart, ChartOptions, ChartType, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('likesChart') likesChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('rentChart') rentChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('sellChart') sellChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('classificationChart') classificationChart!: ElementRef<HTMLCanvasElement>;

  locals: Local[] = [];
  likesChartInstance!: Chart;
  rentChartInstance!: Chart;
  sellChartInstance!: Chart;
  classificationChartInstance!: Chart;

  constructor(private localService: LocalService) {}

  ngOnInit(): void {
    this.loadLocalData();
  }

  ngAfterViewInit(): void {
    this.initializeCharts();
  }

  loadLocalData(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.localService.getAllLocals(token).subscribe(
        locals => {
          this.locals = locals;
          this.updateChartData();
        },
        error => {
          console.error('Failed to load locals', error);
        }
      );
    } else {
      console.error('Token not found');
    }
  }

  initializeCharts(): void {
    // Likes Chart
    this.likesChartInstance = new Chart(this.likesChart.nativeElement, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'Number of Likes',
          data: [],
          backgroundColor: 'grey',
          borderColor: 'black',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      } as ChartOptions<'bar'>
    });

    // Rent Prices Chart
    this.rentChartInstance = new Chart(this.rentChart.nativeElement, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Rent Prices',
          data: [],
          backgroundColor: 'blue',
          borderColor: 'blue',
          fill: false
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      } as ChartOptions<'line'>
    });

    // Sell Prices Chart
    this.sellChartInstance = new Chart(this.sellChart.nativeElement, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Sell Prices',
          data: [],
          backgroundColor: 'green',
          borderColor: 'green',
          fill: false
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      } as ChartOptions<'line'>
    });


  }

  updateChartData(): void {
    if (this.likesChartInstance) {
      // Filter data for Rent and Sell Charts
      const rentLocals = this.locals.filter(local => local.rent > 0);
      const sellLocals = this.locals.filter(local => local.sell > 0);

      // Prepare data for charts
      const allLabels = this.locals.map(local => `Local ${local.localID}`);
      const likesData = this.locals.map(local => local.likes);

      // Filtered data for Rent Prices Chart
      const rentLabels = rentLocals.map(local => `Local ${local.localID}`);
      const rentData = rentLocals.map(local => local.rent);

      // Filtered data for Sell Prices Chart
      const sellLabels = sellLocals.map(local => `Local ${local.localID}`);
      const sellData = sellLocals.map(local => local.sell);

      const forRentCount = this.locals.filter(local => local.rent > 0).length;
      const forSaleCount = this.locals.filter(local => local.sell > 0).length;

      // Update Likes Chart
      this.likesChartInstance.data.labels = allLabels;
      this.likesChartInstance.data.datasets[0].data = likesData;
      this.likesChartInstance.update();

      // Update Rent Prices Chart
      this.rentChartInstance.data.labels = rentLabels;
      this.rentChartInstance.data.datasets[0].data = rentData;
      this.rentChartInstance.update();

      // Update Sell Prices Chart
      this.sellChartInstance.data.labels = sellLabels;
      this.sellChartInstance.data.datasets[0].data = sellData;
      this.sellChartInstance.update();

      this.classificationChartInstance.data.datasets[0].data = [forRentCount, forSaleCount];
      this.classificationChartInstance.update();
    }
  }

}
