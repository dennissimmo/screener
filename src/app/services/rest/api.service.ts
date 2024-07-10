import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { IInstrument, IResponse } from "../../models/api.model";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private _http: HttpClient) {

    }

    loadInstruments(provider = 'oanda', kind = 'forex'): Observable<IInstrument[]> {
        const params = new HttpParams()
            .set('provider', provider)
            .set('kind', kind);
        console.log(params);
        return this._http.get<IResponse>(`api/instruments/v1/instruments`, { params: params }).pipe(
            map(response => response.data)
        );
    }
}