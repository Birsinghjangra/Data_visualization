import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartService } from 'src/app/demo/service/chart.service'; // Import your service

@Component({
  templateUrl: './chartsdemo.component.html'
})
export class ChartsDemoComponent implements OnInit {
  chart: any;
  fieldsData: { [key: string]: number } = {};

  constructor(private chartService: ChartService) { }

  ngOnInit(): void {
    this.chartService.getChartData().subscribe(data => {
      const uniqueRegions = this.getUniqueRegions(data);
      const YearData = this.getUniqueYear(data);
      const intensityData = this.getDataByVariable(data, 'intensity');
      const likelihoodData = this.getDataByVariable(data, 'likelihood');
      const relevanceData = this.getDataByVariable(data, 'relevance');
      const startYearData = this.getDataByVariable(data, 'start_year');
      const endYearData = this.getDataByVariable(data, 'end_year');
      const insightData = this.getDataByVariable(data, 'insight');
      const regionData = this.getDataByVariable(data, 'region');
      const countryData = this.getDataByVariable(data, 'country');
      const cityData = this.getDataByVariable(data, 'city');
      const topicData = this.getDataByVariable(data, 'topic');
      const sourceData = this.getDataByVariable(data, 'source');
      const pestleData = this.getDataByVariable(data, 'pestle');
      const sectorData = this.getDataByVariable(data, 'sector');
      console.log(endYearData,"data")

      this.renderBarChart(uniqueRegions, intensityData, likelihoodData, relevanceData);
      this.renderLineChart(YearData, startYearData, endYearData, intensityData);
      this.renderBarChart1(uniqueRegions, intensityData, likelihoodData, relevanceData);
      this.countFields(data);
      console.log("Count data:", this.fieldsData);
    });
  }

  countFields(data: any[]): void {
    // Initialize fields data object
    this.fieldsData = {};
  
    // Iterate over each object in the array
    data.forEach(item => {
      // Iterate over each field in the object
      Object.keys(item).forEach(key => {
        // Check if the field value is not empty
        if (item[key] !== "" && item[key] !== null && item[key] !== undefined) {
          // If the field exists, increment its count
          if (this.fieldsData.hasOwnProperty(key)) {
            this.fieldsData[key]++;
          } else {
            // Otherwise, initialize the count to 1
            this.fieldsData[key] = 1;
          }
        }
      });
    });
  }

  getUniqueRegions(data: any[]): string[] {
    return [...new Set(data.map(item => item.region))];
  }

  getUniqueYear(data: any[]): number[] {
    return [...new Set(data.map(item => item.startYear))];
  }

  getDataByVariable(data: any[], variable: string): number[] {
    return data.map(item => item[variable]);
  }

  renderBarChart(labels: string[], intensityData: number[], likelihoodData: number[], relevanceData: number[]): void {
    this.chart = new Chart('bar', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Intensity',
          data: intensityData,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: 'Likelihood',
          data: likelihoodData,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: 'Relevance',
          data: relevanceData,
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  renderLineChart(labels: number[], intensityData: number[], startYearData: number[], endYearData: number[]): void {
    const years = Array.from({ length: Math.ceil((2025 - 2000 + 1) / 2) }, (_, i) => 2000 + i * 2);
    console.log("startYearData:", endYearData);

    this.chart = new Chart('line', {
      type: 'line',
      data: {
        labels: years,
        datasets: [{
          label: 'Intensity',
          data: intensityData,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: 'startYear',
          data: startYearData,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: 'endYear',
          data: endYearData,
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
}

renderBarChart1(labels: string[], intensityData: number[], likelihoodData: number[], relevanceData: number[]): void {
    this.chart = new Chart('bar1', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Intensity',
          data: intensityData,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: 'Likelihood',
          data: likelihoodData,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: 'Relevance',
          data: relevanceData,
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  renderLineChart2(labels: number[], intensityData: number[], startYearData: number[], endYearData: number[]): void {
    const years = Array.from({ length: Math.ceil((2025 - 2000 + 1) / 2) }, (_, i) => 2000 + i * 2);
    console.log("startYearData:", endYearData);

    this.chart = new Chart('line', {
      type: 'line',
      data: {
        labels: years,
        datasets: [{
          label: 'Intensity',
          data: intensityData,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: 'startYear',
          data: startYearData,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: 'endYear',
          data: endYearData,
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
}


}
