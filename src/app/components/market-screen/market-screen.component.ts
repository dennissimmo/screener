import { Component, Input } from '@angular/core';
import { IInstrument, IInstrumentPriceUpdate } from "../../models/api.model";

@Component({
  selector: 'app-market-screen',
  templateUrl: './market-screen.component.html',
  styleUrls: ['./market-screen.component.scss']
})
export class MarketScreenComponent {

  @Input()
  update!: IInstrumentPriceUpdate | null;

  @Input()
  instrument!: IInstrument;

  get price(): number | null {
    return this.update ? this.update.last.price : null;
  }

  get timestamp(): Date | null {
    return this.update ? this.update.last.timestamp : null;
  }


}
