import { GlobalDataSummary } from './../../Models/global-data';
import { DataServiceService } from './../../service/data-service.service';
import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    totalConfirmed = 0;
    totalDeaths = 0;
    totalActive = 0;
    totalRecovered = 0;
    globalData: GlobalDataSummary[];
    // pieChart = {
    //   chartType: 'PieChart',
    // }
    // columnChart= {
    //   chartType: 'ColumnChart',
    // }
    datatable =[]

    chart = {
      PieChart : "PieChart" ,
      ColumnChart : 'ColumnChart' ,
      LineChart : "LineChart", 
      height: 500, 
      options: {
        animation:{
          duration: 1000,
          easing: 'out',
        },
        is3D: true
      }  
    }
    

  constructor(private dataService:DataServiceService) { }

  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe({
      next:(result)=>{
        
         result.forEach(element => {
           if(!Number.isNaN(element.confirmed)){
          this.totalActive += element.active;
          this.totalConfirmed += element.confirmed;
          this.totalDeaths += element.deaths;
          this.totalRecovered += element.recovered;
           }
        });
        this.globalData = result;
        this.initChart('c')
        // console.log(result);
      }
    })
  }
 
  updateChart(input:HTMLInputElement){
    console.log(input.value);
    this.initChart(input.value);
  }

    initChart(caseType){
      this.datatable = []
      // this.datatable.push(['country','cases'])

      this.globalData.forEach(cs=>{
        let value:number; 
        if(caseType =='c')
        if(cs.confirmed > 20000)
        value = cs.confirmed;

        if(caseType =='a')
        if(cs.active > 20000)
        value = cs.active;

        if(caseType =='d')
        if(cs.deaths > 5000)
        value = cs.deaths;

        if(caseType =='r')
        if(cs.recovered > 2000)
        value = cs.recovered;

        console.log(value)
        if(value!=undefined)
        this.datatable.push(
          [cs.country,value]
          )
      })
      console.log(this.datatable)
      // this.pieChart = {
      //   chartType:'PieChart',
      //   dataTable: this.datatable,
      //   //firstRowIsData: true,
      //   options: {height: 500,
      //     animation:{
      //       duration:5000,
      //       easing:'out',
      //     },
      //     is3D: true

      //   },
      // }
      // this.columnChart = {
      //   chartType:'ColumnChart',
      //   dataTable: this.datatable,
      //   //firstRowIsData: true,
      //   options: {height: 600,
      //     animation:{
      //       duration:5000,
      //       easing:'out',
      //     },
      //     is3D: true
      //   },
      // }
    }
    
    
  
}
