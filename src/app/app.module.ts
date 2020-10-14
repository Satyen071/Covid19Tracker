import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component//navbar/navbar.component';
import { HomeComponent } from './component/home/home.component';
import { CountriesComponent } from './component/countries/countries.component';
import {HttpClientModule,HttpClient} from '@angular/common/http';
import { DashboardComponent } from './component/dashboard/dashboard.component'
import { GoogleChartsModule } from 'angular-google-charts';
import { SidebarComponent } from './component/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CountriesComponent,
    DashboardComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GoogleChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
