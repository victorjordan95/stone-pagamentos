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
    showModal(currencyOptions): void {
        this.currencyOptions = currencyOptions;
        // Inicializa o modal com a
        // primeira moeda selecionada
        this.currencyOption = currencyOptions[0].id;
        this.operation.show();
    }

    // Função para fechar o modal
    dismissModal() {
        this.operation.hide();
    }

}
