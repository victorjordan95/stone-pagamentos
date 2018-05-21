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
    currencies: any;

    constructor(private _sharedService: SharedService) { }

    ngOnInit() {
        this.getCurrenciesValue();
    }

    getCurrenciesValue() {
        this.currencySubscription = this._sharedService.getCurrencies()
            .subscribe(
                currencies => {
                    // Subscribe em currencies e popula o objeto currencies.
                    // A API utilizada retorna um Array e para que seja feita a
                    // iteração dos valores, é necessário converter em um objeto.
                    this.currencies = [
                        {
                            valor: currencies['valores']['USD'].valor,
                            data: this.convertDate(currencies['valores']['USD'].ultima_consulta),
                            icon: 'icon-dollar-sign'
                        }, {
                            valor: currencies['valores']['BTC'].valor,
                            data: this.convertDate(currencies['valores']['BTC'].ultima_consulta),
                            icon: 'icon-bitcoin'
                        }
                    ];
                    console.log(this.currencies);
                },
                err => console.log(err)
            );
    }

    convertDate(unix_timestamp) {

        // Cria um novo objeto baseado no timestamp
        // multiplica por 1000 pois o elemento está em milisegundos e não segundos.
        const date = new Date(unix_timestamp * 1000);

        // O retorno será no formato 04/5/2018
        return `${date.getDate()}/${date.getMonth() < 10 ? `0${date.getMonth()}` : `${date.getMonth()}`}/${date.getUTCFullYear()}`;
    }

}

