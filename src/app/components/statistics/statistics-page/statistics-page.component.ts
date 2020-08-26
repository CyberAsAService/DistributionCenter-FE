import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from "chart.js";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { of, Observable, from } from 'rxjs';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.css']
})
export class StatisticsPageComponent implements OnInit {

  trendsDatas$ = from([{
    Cluster1: [
      { date: new Date('2/20/2020'), value: 11, value2: 11 + 5, value3: 11 * 2 - 3 },
      { date: new Date('2/21/2020'), value: 12, value2: 12 + 5, value3: 12 * 2 - 3 },
      { date: new Date('2/22/2020'), value: 13, value2: 13 + 5, value3: 13 * 2 - 3 },
      { date: new Date('2/23/2020'), value: 14, value2: 14 + 5, value3: 14 * 2 - 3 },
      { date: new Date('2/24/2020'), value: 15, value2: 15 + 5, value3: 15 * 2 - 3 },
      { date: new Date('2/25/2020'), value: 16, value2: 16 + 5, value3: 16 * 2 - 3 },
      { date: new Date('2/26/2020'), value: 17, value2: 17 + 5, value3: 17 * 2 - 3 },
      { date: new Date('2/27/2020'), value: 18, value2: 18 + 5, value3: 18 * 2 - 3 },
      { date: new Date('2/28/2020'), value: 19, value2: 19 + 5, value3: 19 * 2 - 3 },
      { date: new Date('3/1/2020'), value: 20, value2: 20 + 5, value3: 20 * 2 - 3 },
      { date: new Date('3/2/2020'), value: 22, value2: 22 + 5, value3: 22 * 2 - 3 },
      { date: new Date('3/3/2020'), value: 13, value2: 13 + 5, value3: 13 * 2 - 3 },
      { date: new Date('3/4/2020'), value: 32, value2: 32 + 5, value3: 32 * 2 - 3 },
      { date: new Date('3/5/2020'), value: 22, value2: 22 + 5, value3: 22 * 2 - 3 },
      { date: new Date('3/6/2020'), value: 12, value2: 12 + 5, value3: 12 * 2 - 3 },
      { date: new Date('3/7/2020'), value: 42, value2: 42 + 5, value3: 42 * 2 - 3 },
      { date: new Date('3/8/2020'), value: 52, value2: 52 + 5, value3: 52 * 2 - 3 },
      { date: new Date('3/9/2020'), value: 62, value2: 62 + 5, value3: 62 * 2 - 3 },
      { date: new Date('3/10/2020'), value: 72, value2: 72 + 5, value3: 72 * 2 - 3 },
    ],
    Cluster2: [
      { date: new Date('2/20/2020'), value: 11 + 40 },
      { date: new Date('2/21/2020'), value: 12 + 40 },
      { date: new Date('2/22/2020'), value: 13 + 40 },
      { date: new Date('2/23/2020'), value: 14 + 40 },
      { date: new Date('2/24/2020'), value: 15 + 40 },
      { date: new Date('2/25/2020'), value: 16 + 40 },
      { date: new Date('2/26/2020'), value: 17 + 40 },
      { date: new Date('2/27/2020'), value: 18 + 40 },
      { date: new Date('2/28/2020'), value: 19 + 40 },
      { date: new Date('3/1/2020'), value: 20 + 40 },
      { date: new Date('3/2/2020'), value: 22 + 40 },
      { date: new Date('3/3/2020'), value: 13 + 40 },
      { date: new Date('3/4/2020'), value: 32 + 40 },
      { date: new Date('3/5/2020'), value: 22 + 40 },
      { date: new Date('3/6/2020'), value: 12 + 40 },
      { date: new Date('3/7/2020'), value: 42 + 40 },
      { date: new Date('3/8/2020'), value: 52 + 40 },
      { date: new Date('3/9/2020'), value: 62 + 40 },
      { date: new Date('3/10/2020'), value: 7 + 402 },
    ],
    Cluster3: [
      { date: new Date('2/20/2020'), value: 11 + 40 * 13.6  },
      { date: new Date('2/21/2020'), value: 12 + 40 * 13.6  },
      { date: new Date('2/22/2020'), value: 13 + 40 * 13.6  },
      { date: new Date('2/23/2020'), value: 14 + 40 * 13.6  },
      { date: new Date('2/24/2020'), value: 15 + 40 * 13.6  },
      { date: new Date('2/25/2020'), value: 16 + 40 * 13.6  },
      { date: new Date('2/26/2020'), value: 17 + 40 * 13.6  },
      { date: new Date('2/27/2020'), value: 18 + 40 * 13.6  },
      { date: new Date('2/28/2020'), value: 19 + 40 * 13.6  },
      { date: new Date('3/1/2020'), value: 20 +  40 * 13.6  },
      { date: new Date('3/2/2020'), value: 22 +  40 * 13.6  },
      { date: new Date('3/3/2020'), value: 13 +  40 * 13.6  },
      { date: new Date('3/4/2020'), value: 32 +  40 * 13.6  },
      { date: new Date('3/5/2020'), value: 22 +  40 * 13.6  },
      { date: new Date('3/6/2020'), value: 12 +  40 * 13.6  },
      { date: new Date('3/7/2020'), value: 42 +  40 * 13.6  },
      { date: new Date('3/8/2020'), value: 52 +  40 * 13.6  },
      { date: new Date('3/9/2020'), value: 62 +  40 * 13.6  },
      { date: new Date('3/10/2020'), value: 7 +  40 * 13.62 },
    ]
  }]);

  trendsData$: any;
  productsTrends$: Observable<string[]>; /* = ['Cluster1', 'Cluster2', 'Cluster3']; */
  selectedProduct: string[];
  // Date range
  form: FormGroup;
  beginDate;
  endDate;

  DateTimeLine: number;

  public lineChartLabels: Label[] = [];
  public lineChartColors: Color[] = [
    { r: 230, g: 27, b: 27 },
    { r: 2, g: 134, b: 222 },
    { r: 148, g: 159, b: 177 },
    { r: 0, g: 0, b: 0 },
    { r: 2, g: 220, b: 100 },
    { r: 248, g: 222, b: 126 },
    { r: 138, g: 43, b: 226 },
    { r: 0, g: 139, b: 139 },
    { r: 250, g: 140, b: 0 }
  ].map(color => ({
    backgroundColor: "rgba(0,0,0,0)",
    borderColor: `rgba(${color.r},${color.g},${color.b},1)`,
    pointBackgroundColor: `rgba(${color.r},${color.g},${color.b},1)`,
    pointBorderColor: "#fff",
    pointHoverBackgroundColor: "#fff",
    pointHoverBorderColor: `rgba(${color.r},${color.g},${color.b},0.8)`
  }));

  public lineChartOptions = {
    legend: {
      labels: {
        usePointStyle: true
      }
    }
  };
  public lineChartLegend = true;
  public lineChartType = "line";
  public lineChartPlugins = [pluginAnnotations];
  constructor(fb: FormBuilder) {
    this.form = fb.group({
      date: [{ begin: new Date(moment().subtract(3, 'months').calendar()), end: new Date(moment().format('L')) }, Validators.required]
    });
  }

  ngOnInit() {
    this.beginDate = this.form.value.date.begin.getTime();
    this.endDate = this.form.value.date.end.getTime();
    this.productsTrends$ = this.trendsDatas$.pipe(map(trends => 
      Object.keys(trends)
    ));
    // this.productsTrends$ = of(['Cluster1', 'Cluster2', 'Cluster3']);
    this.selectedProduct = ['Cluster1'];
    this.filterData();
  }

  
  filterData() {
      this.beginDate = this.form.value.date.begin.getTime();
      this.endDate = this.form.value.date.end.getTime();
      this.trendsData$ = this.trendsDatas$.pipe(
        // check if multi select selected
        map(trends => {
        let result = [];
        for (let product in trends) {
          if ((this.selectedProduct).includes(product)) {
            // select more than one product
            if (this.selectedProduct.length > 1) {
              result.push(...trends[product].map(row => {for (let innerKey in row)
                {
                  if (innerKey != 'date') {
                    row[product + '_'+ innerKey] = row[innerKey];
                    delete row[innerKey];
                  }
                }
                return row;
              }
              ));
            } else {
              result.push(...trends[product]);
            }
          }
        }
        return result;
      }),
        // push the relevant data by filter of date
        map(complianceTrends => { 
          const result: ChartDataSets[] = [];
          const complianceDataObject: {
            [k in keyof any]?: number[]
          } = {};
          this.lineChartLabels = [];
          for (const complianceTrend of complianceTrends) {
            this.DateTimeLine = new Date(complianceTrend.date).getTime();
            if (this.DateTimeLine >= this.beginDate && this.DateTimeLine <= this.endDate) {
              this.lineChartLabels.push(
                moment(complianceTrend.date).format("MMM Do YY")
              );
            }
            for (const key in complianceTrend) {
              if (complianceTrend[key] !== undefined) {
                if (!complianceDataObject[key]) {
                  complianceDataObject[key] = [];
                }
                if (this.DateTimeLine >= this.beginDate && this.DateTimeLine <= this.endDate) {
                  complianceDataObject[key].push(complianceTrend[key]);
                }
              }
            }
          }
          this.lineChartLabels = Array.from(new Set(this.lineChartLabels));
          for (const key in complianceDataObject) {
            if (key !== "date") {
              result.push({
                data: complianceDataObject[key],
                label: key.split("_").join(" ")
              });
            }
          }
          return result;
        })
      );
  }

}
