import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-troca-operacao',
    templateUrl: './troca-operacao.component.html'
})
export class TrocaOperacaoComponent implements OnInit {
    @ViewChild('changeOperationModal') operation: ModalDirective;

    // private currencySubscription: Subscription;
    private userId;
    public currencies;
    public values = 0;
    public quantityOption = '';
    public currencyOptions;
    public currencyOption;
    public currencyForChange;

    constructor() { }

    ngOnInit() {
    }

    // Função para inicializar o modal
    // recebe os valores das moedas e
    // as moedas que o usuário possui
    showModal(currenciesValue, userCurrencies): void {
        this.currencyOptions = userCurrencies;

        // Inicializa o modal com a
        // primeira moeda selecionada
        this.currencyOption = userCurrencies[0].id;
        this.currencies = currenciesValue;
        this.operation.show();
    }

    // Função para fechar o modal
    dismissModal() {
        this.operation.hide();
    }

    onSubmit(f: NgForm) {
        console.log('oi!');
    }

    onChange(currencyId) {
        this.currencyOption = currencyId;
        // this.values = this._calcDifference(quantity);
    }

    changeCurrency(currency) {
        this.currencyForChange = currency;
        console.log(currency);
    }

    onKey(quantity) {
        this.values = this._calcDifference(quantity);
    }

    _calcDifference(quantity) {
        return (quantity * this.currencies[this.currencyOption].valor) / this.currencies[this.currencyForChange].valor;
    }

}
