import { Subscription } from 'rxjs';
import { SharedService } from './../shared/shared.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-cotacao',
    templateUrl: './cotacao.component.html',
    providers: [SharedService],
    encapsulation: ViewEncapsulation.None
})
export class CotacaoComponent implements OnInit {

    private currencySubscription: Subscription;
    currencies;

    constructor(private _sharedService: SharedService) { }

    ngOnInit() {
        this.getCurrenciesValue();
    }

    getCurrenciesValue() {
        debugger;
        this.currencySubscription = this._sharedService.getBTC()
            .subscribe(
                currencies => {
                    this.currencies = currencies;
                    console.log(currencies);
                },
                err => console.log(err)
            );
    }

}

