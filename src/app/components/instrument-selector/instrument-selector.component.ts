import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { IInstrument } from "../../models/api.model";
import { map, Observable, startWith } from "rxjs";
import { ApiService } from "../../services/rest/api.service";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { InstrumentService } from "../../services/instrument/instrument.service";

@Component({
  selector: 'app-instrument-selector',
  templateUrl: './instrument-selector.component.html',
  styleUrls: ['./instrument-selector.component.scss']
})
export class InstrumentSelectorComponent implements OnInit {
    instrumentControl = new FormControl<string | IInstrument>('');
    options: IInstrument[] = [];
    filteredOptions!: Observable<IInstrument[]>;

    constructor(
        private _api: ApiService,
        private _instrument: InstrumentService
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
        this._instrument.onInstrumentChanged($event.option.value);
    }
}
