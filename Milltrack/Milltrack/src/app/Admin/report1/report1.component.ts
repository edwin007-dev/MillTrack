import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-report1',
  templateUrl: './report1.component.html',
  styleUrls: ['./report1.component.css']
})
export class Report1Component {

  public piechartarray: any[] = []; 
 
   constructor(private fb: FormBuilder, private router:Router ,private dbservice: DbserviceService){}
 
 
  public chart!: Chart; 
 
  @ViewChild('myChart') myChart!: ElementRef; 
 
  ngAfterViewInit(): void {
    this.dbservice.report1().then((data: any) => { 
      this.piechartarray = data; 
      this.createChart(); 
    }); 
  } 
 
  createChart() { 
    const chartData = { 
      labels: this.piechartarray.map(item => item.subcatname), 
      datasets: [{ 
        // data: this.categorydataarray.map(item => item.someNumericProperty), 
// replace with actual numeric property 
          data: this.piechartarray.map(item => item.bookingcount), 
        backgroundColor: [ 
          'rgba(255, 99, 132, 0.7)', 
          'rgba(54, 162, 235, 0.7)', 
          'rgba(255, 206, 86, 0.7)', 
        ], 
      }], 
    }; 
 
    this.chart = new Chart(this.myChart.nativeElement, { 
      type: 'pie', 
      data: chartData, 
      options: { aspectRatio: 2.5 } 
    }); 
  } 

  
}

