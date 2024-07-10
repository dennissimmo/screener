import { Component } from '@angular/core';
import { ICountBarRequest } from "../../models/api.model";
import { InstrumentService } from "../../services/instrument/instrument.service";
import { ApiService } from "../../services/rest/api.service";
import { catchError, filter, map, of, switchMap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-price-chart',
  templateUrl: './price-chart.component.html',
  styleUrls: ['./price-chart.component.scss']
})
export class PriceChartComponent {

    errorMessage = '';
    chartData: Array<Object> = Array.of();
    // chart options
    view: [number, number] = [700, 300];
    animations: boolean = true;
    xAxis: boolean = true;
    yAxis: boolean = true;
    timeline: boolean = true;

  constructor(
      private _instrument: InstrumentService,
      private _api: ApiService
  ) {
  }

  ngOnInit(): void {
    this._instrument.instrumentChanged.pipe(
        filter(instrument => !!instrument),
        map(ins => ins.id),
        switchMap((id: string) => {
          const request: ICountBarRequest = {
              instrumentId: id,
              provider: 'simulation',
              interval: 1,
              periodicity: 'hour',
              barsCount: 1000
          };
          return this._api.loadHistoryPrices(request)
              .pipe(
                  catchError((err : HttpErrorResponse) => {
                      const error = err.error;
                      this.chartData = [];
                      return of( 'Error while loading price history');
                  })
              );
        }),
    ).subscribe(data => {
        if (typeof data !== 'string') {
            this.errorMessage = '';
            const formattedData = data.data.map(entry => {
                return {
                    name: new Date(entry.t),
                    value: entry.c
                }
            });
            this.chartData = [];
            this.chartData.push({
                name: '',
                series: formattedData
            });
        } else {
            this.errorMessage = data;
        }
    });
  }
}
