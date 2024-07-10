import { Component, OnInit } from '@angular/core';
import { WebsocketService } from "../../services/websocket/websocket.service";
import { IInstrument, IInstrumentPriceUpdate, IUpdateSubscription } from "../../models/api.model";
import { Subscription } from "rxjs";
import { InstrumentService } from "../../services/instrument/instrument.service";

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
      private _websocket: WebsocketService,
      private _instrument: InstrumentService
  ) {
  }
  ngOnInit(): void {
    this._websocket.connect();
    this._instrument.instrumentChanged
        .subscribe(instrument => this.onInstrumentChanged(instrument));
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
    });
  }

  onInstrumentChanged(instrument: IInstrument) {
    this.instrument = instrument;
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
