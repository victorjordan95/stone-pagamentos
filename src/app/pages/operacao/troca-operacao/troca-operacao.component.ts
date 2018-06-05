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
    public userCurrencies;

    constructor() { }

    ngOnInit() {
    }

    // Função para inicializar o modal
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
        this.quantityOption = '';
        this.values = 0;
    }

}
