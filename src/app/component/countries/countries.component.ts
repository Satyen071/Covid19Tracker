import { GoogleChartInterface } from 'ng2-google-charts';
import { DateWiseData } from './../../Models/datewise-data';
import { GlobalDataSummary } from './../../Models/global-data';
import { DataServiceService } from './../../service/data-service.service';
import { Component, OnInit } from '@angular/core';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  totalConfirmed = 0;
  totalDeaths = 0;
  totalActive = 0;
  totalRecovered = 0;
  dateWiseData;
  selectedCountryDateWiseData : DateWiseData[];
  data:GlobalDataSummary[];
  countries:string[]=[];
  lineChart={
    chartType:'LineChart',
    height: 500, 
      options: {
        animation:{
          duration: 1000,
          easing: 'out',
        },
        is3D: true
      }  
  }
  datatable =[];
  constructor(private dataService:DataServiceService) { }

  ngOnInit(): void {

    merge(

      this.dataService.getDatewiseData().pipe(
        map(result=>{
          this.dateWiseData = result;
        })
        ),
        
        this.dataService.getGlobalData().pipe(map(result=>{
          this.data = result;
          this.data.forEach(cs=>{
            this.countries.push(cs.country)
          })
        }))

    ).subscribe({
      complete:()=>{
        this.updateCountry('India')
        // this.selectedCountryDateWiseData = this.dateWiseData['India']
        // this.updateChart();
      }
    })

    

    
  }

  updateCountry(country:string){
    console.log(country)
    
    this.data.forEach(cs=>{
      if(cs.country==country){
        this.totalActive = cs.active;
        this.totalConfirmed = cs.confirmed;
        this.totalDeaths = cs.deaths;
        this.totalRecovered = cs.recovered;
      }
    })
    this.selectedCountryDateWiseData = this.dateWiseData[country];
    // console.log(this.selectedCountryDateWiseData);
    this.updateChart();

  }

    updateChart(){
      this.datatable =[];
      // this.datatable.push(['Date','Cases'])
      this.selectedCountryDateWiseData.forEach(cs=>{
        this.datatable.push([cs.date,cs.cases]);
      })
     
    }

  
}
