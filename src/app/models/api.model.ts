export interface IResponse {
    paging: IPaging
    data: IInstrument[]
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
    mappings: Mappings
}

export interface Mappings {
    "active-tick": ActiveTick;
    simulation?:   ActiveTick;
    oanda:         ActiveTick;
    dxfeed?:       ActiveTick;
}

export interface ActiveTick {
    symbol: string
    exchange: string
    defaultOrderSize: number
}

export interface Simulation {
    symbol: string
    exchange: string
    defaultOrderSize: number
}

export interface Oanda {
    symbol: string
    exchange: string
    defaultOrderSize: number
}

export interface Dxfeed {
    symbol: string
    exchange: string
    defaultOrderSize: number
}
