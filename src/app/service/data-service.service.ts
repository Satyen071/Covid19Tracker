import { DateWiseData } from './../Models/datewise-data';
import { GlobalDataSummary } from './../Models/global-data';
import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private globalDataUrl = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/10-13-2020.csv`
  private dateWiseDataUrl = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv`

  constructor(private http: HttpClient) { }

  getDatewiseData(){
    return this.http.get(this.dateWiseDataUrl,{responseType:'text'})
    .pipe(map(result=>{
      let rows = result.split('\n');
      // console.log(rows);
      let actualData = {}
      let header = rows[0];
      let dates = header.split(/,(?=\S)/);
      dates.splice(0,4);
      // console.log(dates)
      rows.splice(0,1);
      rows.forEach(row=>{
        let cols = row.split(/,(?=\S)/)
        let country = cols[1];
        cols.splice(0,4);
        actualData[country] = []
        // console.log(country,cols);
        cols.forEach((value,index)=>{
          let data :DateWiseData={
            country:country,
            cases:+value,
            date:new Date(Date.parse(dates[index]))
          }
          actualData[country].push(data);
        })
      })
      // console.log(actualData);
      
      
      return actualData;
    }));
  }

  getGlobalData(){
    
      return this.http.get(this.globalDataUrl,{responseType: 'text'}).pipe(
        map(result=>{
          let data:GlobalDataSummary[] = [];
          let raw = {};
         let rows = result.split('\n');
         rows.splice(0,1);
          rows.forEach(row=>{
            // console.log(row);
            let cols = row.split(/,(?=\S)/)
            // console.log(cols)
            let cs= {
              country:cols[3],
              confirmed:+cols[7],
              deaths: +cols[8],
              recovered:+cols[9],
              active: +cols[10]
            }
            let temp:GlobalDataSummary = raw[cs.country]
            if(temp){
              temp.active = cs.active+temp.active;
              temp.confirmed = cs.confirmed + temp.confirmed;
              temp.deaths = cs.deaths + temp.deaths;
              temp.recovered = cs.recovered + temp.recovered;  
              raw[cs.country] = temp;
            }else{
              raw[cs.country] = cs;
            }
            
          })
          // console.log(raw);
          return <GlobalDataSummary[]>Object.values(raw);
          
        })
      )
  }
}
