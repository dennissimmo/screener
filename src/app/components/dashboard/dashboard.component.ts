import { Component, OnInit } from '@angular/core';
import { WebsocketService } from "../../services/websocket/websocket.service";
import { IInstrument, IInstrumentPriceUpdate, IUpdateSubscription } from "../../models/api.model";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  instrument!: IInstrument;

  instrumentUpdate: IInstrumentPriceUpdate | null = null;
  updatesSubscription: Subscription | null = null;

  constructor(
      private _websocket: WebsocketService
  ) {
  }
  ngOnInit(): void {
    this._websocket.connect();
  }

  subscribe() {
    if (!this.instrument) return;

    const lastPriceSubscription: IUpdateSubscription = {
      "type": "l1-subscription",
      "id": "1",
      "instrumentId": this.instrument.id,
      "provider": "simulation",
      "subscribe": true,
      "kinds": [
        "last"
      ]
    };
    this._websocket.subscribeForPriceUpdate(lastPriceSubscription);
    this.updatesSubscription = this._websocket.instrumentUpdates$.subscribe(update => {
      this.instrumentUpdate = update;
      console.log(this.instrumentUpdate);
    });
  }

  onInstrumentChanged(instrument: IInstrument) {
    this.unsubscribe();
    this.instrument = instrument;
    console.log(this.instrument);
  }

  unsubscribe(): void {
    if (!this.updatesSubscription) return;

    this.updatesSubscription.unsubscribe();
    this.updatesSubscription = null;
    this.instrumentUpdate = null;

    const lastPriceCancelSubscription: IUpdateSubscription = {
      "type": "l1-subscription",
      "id": "1",
      "instrumentId": this.instrument.id,
      "provider": "simulation",
      "subscribe": false,
      "kinds": [
        "last"
      ]
    };
    this._websocket.sendMessage(lastPriceCancelSubscription);
  }
}
