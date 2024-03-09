import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartService } from 'src/app/demo/service/chart.service';
@Component({
  templateUrl: './chartsdemo.component.html'
})
export class ChartsDemoComponent implements OnInit {
  chart: any;
  fieldsData: { [key: string]: number } = {};

  constructor(private chartService: ChartService) { }

  ngOnInit(): void {
    this.chartService.getChartData().subscribe(data => {
        console.log(data,'apidata')
      const uniqueRegions = this.getUniqueRegions(data);
      const YearData = this.getUniqueYear(data);
      const uniqueSector = this.getUniqueSector(data);
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
    //   console.log(topicData,"data")
      let unique_Topics_fields= [...new Set(topicData)];
    //   console.log('uniqueTopics:', unique_Topics_fields)

      this.renderChart1(uniqueRegions, intensityData, likelihoodData, relevanceData);
      this.renderChart2(YearData, startYearData, endYearData, intensityData);
      this.renderChart3(uniqueSector, uniqueSector, intensityData);
      this.renderChart4(unique_Topics_fields.map(String), unique_Topics_fields.map(String));
      //   console.log(topicData,"data")

      this.countFields(data);
    //   console.log("Count data:", this.fieldsData);
    });
  }

  countFields(data: any[]): void {
    this.fieldsData = {};
    data.forEach(item => {
      Object.keys(item).forEach(key => {
        if (item[key] !== "" && item[key] !== null && item[key] !== undefined) {
          if (this.fieldsData.hasOwnProperty(key)) {
            this.fieldsData[key]++;
          } else {
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
  getUniqueSector(data: any[]): string[] {
    return [...new Set(data.map(item => item.sector))];
  }

  getDataByVariable(data: any[], variable: string): number[] {
    return data.map(item => item[variable]);
  }

  renderChart1(labels: string[], intensityData: number[], likelihoodData: number[], relevanceData: number[]): void {
    this.chart = new Chart('renderChart1', {
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

  renderChart2(labels: number[], intensityData: number[], startYearData: number[], endYearData: number[]): void {
    const years = Array.from({ length: Math.ceil((2025 - 2000 + 1) / 2) }, (_, i) => 2000 + i * 2);
    // console.log("startYearData:", endYearData);

    this.chart = new Chart('renderChart2', {
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

renderChart3(labels: string[], uniqueSector: string[], intensityData: number[]): void {
    this.chart = new Chart('renderChart3', {
      type: 'bar',
      data: {
        labels: labels, 
        datasets: [{
          label: 'Intensity',
          data: intensityData,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Sector'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Intensity'
            }
          }
        }
      }
    });
}

topics1= []
// Adjust the function to accept numerical data
renderChart4(labels: string[], unique_Topics_fields: string[]): void {
    this.chart = new Chart('renderChart4', {
      type: 'bubble',
      data: {
        labels: labels, 
        datasets: [{
          label: 'Topic Data',
          data: unique_Topics_fields,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            // Add more colors if needed
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            // Add more colors if needed
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'uniqueTopics'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Intensity'
            }
          }
        }
      }
    });
}

}
