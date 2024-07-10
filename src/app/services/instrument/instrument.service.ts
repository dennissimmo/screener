import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { IInstrument } from "../../models/api.model";

@Injectable({
    providedIn: 'root'
})
export class InstrumentService {

    instrumentChanged: Subject<IInstrument> = new Subject<IInstrument>();

    onInstrumentChanged(instrument: IInstrument) {
        this.instrumentChanged.next(instrument);
    }
}