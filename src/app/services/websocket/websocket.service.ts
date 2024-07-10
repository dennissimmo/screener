import { Injectable } from "@angular/core";
import { webSocket } from "rxjs/webSocket";
import { AuthService } from "../auth/auth.service";
import { environment } from "../../../environments/environment";
import { IInstrumentPriceUpdate, IUpdateSubscription } from "../../models/api.model";
import { filter, Observable, Subject, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {

    ws: any;
    instrumentUpdates$!: Observable<IInstrumentPriceUpdate>;
    activeInstrumentId: string = '';
    messagesSubject: Subject<any> = new Subject<any>();

    constructor(
        private _auth: AuthService
    ) {
    }

    connect(): void {
        const token = this._auth.getToken();
        if (token) {
            const uri = `${environment.wssAddress}?token=${token}`;
            this.ws = webSocket(uri);
            this.ws.subscribe((message: any) => this.messagesSubject.next(message));
        }
    }

    sendMessage(message: any): void {
        this.ws.next(message);
    }

    subscribeForPriceUpdate(subscription: IUpdateSubscription) {
        this.activeInstrumentId = subscription.instrumentId;
        this.instrumentUpdates$ = this.messagesSubject.pipe(
            filter((message) => message['instrumentId'] && message['instrumentId'] === this.activeInstrumentId)
        );
        this.sendMessage(subscription);
    }
}