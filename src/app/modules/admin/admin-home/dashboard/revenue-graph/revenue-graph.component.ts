import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables, Colors } from 'node_modules/chart.js';
import { AdminService } from 'src/app/core/services/admin.service';

Chart.register(...registerables);
Chart.register(Colors);

@Component({
  selector: 'app-revenue-graph',
  templateUrl: './revenue-graph.component.html',
  styleUrls: ['./revenue-graph.component.scss']
})
export class RevenueGraphComponent implements OnInit {

  @ViewChild('chart') ctx :ElementRef;
  colors = {
    purple: {
      default: "rgba(149, 76, 233, 1)",
      half: "rgba(149, 76, 233, 0.5)",
      quarter: "rgba(149, 76, 233, 0.25)",
      zero: "rgba(149, 76, 233, 0)"
    },
    indigo: {
      default: "rgba(80, 102, 120, 1)",
      quarter: "rgba(80, 102, 120, 0.25)"
    }
  };

  public chart: any;
  monthWiseRevenue: any[];
  revenues: number[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.renderChart();
    this.setmonthWiseRevenue();
  }

  setmonthWiseRevenue() {
    this.adminService.getGraphData().subscribe(
      response => {
        this.monthWiseRevenue = response.responseData;
        console.log(this.monthWiseRevenue);

        let maxMonth = this.monthWiseRevenue[this.monthWiseRevenue.length - 1][0];

        for (let month = 1; month <= maxMonth; month++) {
          let revenue = 0;

          for (let i = 0; i < this.monthWiseRevenue.length; i++) {
            if (this.monthWiseRevenue[i][0] === month) {
              revenue = this.monthWiseRevenue[i][1];
              break;
            }
          }

          this.revenues.push(revenue);
          revenue = 0;
        }

        // console.log(this.revenues);
        // this.chart.data.datasets.data = this.revenues;
      }
    );
  }

  renderChart() {

    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
        ],
        datasets: [
          {
            label: "Revenue",
            data: [50000, 25000, 40000, 15000, 30000, 85000, 160000, 75000, 190000, 150000, 200000, 215000],
            // data : this.revenues,
            backgroundColor: "rgba(53, 89, 233,0.1)",
            borderColor: '#3559E9',
            pointBackgroundColor: '#3559E9',
            fill: true,
            pointRadius: 3,
            borderWidth: 2,
            tension: 0.4
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {

          }
        }
      }

    });
  }

}
