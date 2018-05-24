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

    constructor(public _sharedService: SharedService) { }

    ngOnInit() {
        // Inicia o componente e faz o
        // GET da cotação das moedas
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
                },
                err => console.log(err)
            );
    }

    convertDate(unix_timestamp) {

        // Cria um novo objeto baseado no timestamp
        // multiplica por 1000 pois o elemento está em milisegundos e não segundos.
        const date = new Date(unix_timestamp * 1000);

        // Formatando a data para que o
        // retorno seja em formato amigável
        return `${date.getDate()}/${date.getMonth() < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth()}`}/${date.getUTCFullYear()}`;
    }

}

