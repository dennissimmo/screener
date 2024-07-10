export interface IResponse {
    paging: IPaging;
    data: IInstrument[];
}

export interface IAuthResponse {
    access_token:        string;
    expires_in:          number;
    refresh_expires_in:  number;
    refresh_token:       string;
    token_type:          string;
    session_state:       string;
    scope:               string;
}

export interface IUpdateSubscription {
    type:         string;
    id:           string;
    instrumentId: string;
    provider:     string;
    subscribe:    boolean;
    kinds:        string[];
}

export interface ICountBarRequest {
    instrumentId: string;
    provider: string;
    interval: number;
    periodicity: string;
    barsCount: number;
}

export interface IDataResponse<T> {
    data: T[];
}

export interface IPriceChange {
    t: Date;
    // open
    o: number;
    // high
    h: number;
    // last
    l: number;
    // close
    c: number;
    // volume
    v: number;
}


export interface IInstrumentPriceUpdate {
    type:         string;
    instrumentId: string;
    provider:     string;
    last:         ILastUpdate;
}

export interface ILastUpdate {
    timestamp: Date;
    price:     number;
    volume:    number;
    change:    number;
    changePct: number;
}


export interface IPaging {
    page: number
    pages: number
    items: number
}

export interface IInstrument {
    id: string
    symbol: string
    kind: string
    description: string
    tickSize: number
    currency: string
    baseCurrency: string
    mappings: any
}

