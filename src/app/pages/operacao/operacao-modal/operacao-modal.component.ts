import { SharedService } from './../../shared/shared.service';
import { Subscription } from 'rxjs';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';

@Component({
    selector: 'app-operacao-modal',
    templateUrl: './operacao-modal.component.html',
    providers: [SharedService],
    encapsulation: ViewEncapsulation.None
})
export class OperacaoModalComponent implements OnInit {
    @ViewChild('operationModal') operation: ModalDirective;

    private currencySubscription: Subscription;
    currencies;
    values;
    quantityOption = '';
    currencyOptions = [
        {'id' : 1, 'currency': 'Real'},
        {'id' : 2, 'currency': 'Dólar'},
        {'id' : 3, 'currency': 'Bitcoin'},
    ];
    currencyOption = this.currencyOptions[0].id;

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
                            data: this._sharedService.convertDate(currencies['valores']['USD'].ultima_consulta),
                            icon: 'icon-dollar-sign'
                        }, {
                            valor: currencies['valores']['BTC'].valor,
                            data: this._sharedService.convertDate(currencies['valores']['BTC'].ultima_consulta),
                            icon: 'icon-bitcoin'
                        }
                    ];
                },
                err => console.log(err)
            );
    }

    showModal(): void {
        this.openModal();
    }

    openModal() {
        this.operation.show();
    }

    dismissModal() {
        this.operation.hide();
    }

    onKey(value) {
        console.log(this.currencyOption);
        if (this.currencyOption === 1) {
            this.values = value;
        } else if (this.currencyOption === 2) {
            this.values = value * this.currencies[1].valor;
        } else {
            this.values = value * this.currencies[0].valor;
        }
    }

    onChange(currencyId) {
        this.currencyOption = currencyId;
        this.quantityOption = '';
        this.values = 0;
    }

}
