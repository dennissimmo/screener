import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { InstrumentSelectorComponent } from "./components/instrument-selector/instrument-selector.component";
import { MarketScreenComponent } from "./components/market-screen/market-screen.component";
import { PriceChartComponent } from "./components/price-chart/price-chart.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { JwtInterceptor } from "./interceptors/jwt.interceptor";
import { RouterOutlet } from "@angular/router";
import { TokenComponent } from "./components/token/token.component";
import { AppRoutingModule } from "./app.routing.module";
import { LineChartModule } from "@swimlane/ngx-charts";

@NgModule({
  declarations: [
    AppComponent,
      DashboardComponent,
      InstrumentSelectorComponent,
      MarketScreenComponent,
      PriceChartComponent,
      TokenComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatInputModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterOutlet,
        AppRoutingModule,
        FormsModule,
        LineChartModule
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
