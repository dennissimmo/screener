import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from "@angular/forms";
import { IInstrument } from "../../models/api.model";
import { map, Observable, startWith } from "rxjs";
import { ApiService } from "../../services/rest/api.service";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";

@Component({
  selector: 'app-instrument-selector',
  templateUrl: './instrument-selector.component.html',
  styleUrls: ['./instrument-selector.component.scss']
})
export class InstrumentSelectorComponent implements OnInit {
    instrumentControl = new FormControl<string | IInstrument>('');
    options: IInstrument[] = [];
    filteredOptions!: Observable<IInstrument[]>;

    @Output()
    instrumentEventEmitter: EventEmitter<IInstrument> = new EventEmitter<IInstrument>();

    constructor(
        private _api: ApiService
    ) {
    }

    ngOnInit() {
        this._api.loadInstruments().subscribe(options => {
            this.options = options;
            this.instrumentControl.setValue('');
        });
        this.filteredOptions = this.instrumentControl.valueChanges.pipe(
            startWith(''),
            map(value => {
                const name = typeof value === 'string' ? value : value?.symbol;
                return name ? this._filter(name as string) : this.options.slice();
            }),
        );
    }

    displayFn(user: IInstrument): string {
        return user && user.symbol ? user.symbol : '';
    }

    private _filter(name: string): IInstrument[] {
        const filterValue = name.toLowerCase();

        return this.options.filter(option => option.symbol.toLowerCase().includes(filterValue));
    }

    onInstrumentSelected($event: MatAutocompleteSelectedEvent) {
        this.instrumentEventEmitter.emit($event.option.value);
    }
}
