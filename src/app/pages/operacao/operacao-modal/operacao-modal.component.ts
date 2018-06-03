import { AngularFireAuth } from 'angularfire2/auth';
import { SharedService } from './../../shared/shared.service';
import { Subscription } from 'rxjs';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
    selector: 'app-operacao-modal',
    templateUrl: './operacao-modal.component.html',
    providers: [SharedService, AngularFireDatabase, AngularFireAuth],
    encapsulation: ViewEncapsulation.None
})
export class OperacaoModalComponent implements OnInit {
    @ViewChild('operationModal') operation: ModalDirective;

    private currencySubscription: Subscription;
    public userId;
    public operationTitle;
    public data;
    public final_data;
    public currencies;
    public values = 0;
    public quantityOption = '';
    public currencyOptions;
    public currencyOption;

    constructor(public _sharedService: SharedService, private angularFire: AngularFireDatabase,
        private afAuth: AngularFireAuth) {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.userId = user.uid;
            }
        });
    }

    ngOnInit() {
        // Inicia o componente e faz o
        // GET da cotação das moedas
        this.getCurrenciesValue();
    }

    // Busca todas as moedas
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

    // Função para inicializar o modal
    showModal(type): void {
        if (type === 'compra') {
            this.operationTitle = 'Comprar';
            this.currencyOptions = [
                { 'id': 0, 'currency': 'Real' },
                { 'id': 1, 'currency': 'Dólar' },
                { 'id': 2, 'currency': 'Bitcoin' },
            ];
        } else {
            this.operationTitle = 'Vender';
            this.currencyOptions = [
                { 'id': 1, 'currency': 'Dólar' },
                { 'id': 2, 'currency': 'Bitcoin' },
            ];
        }
        this.currencyOption = this.currencyOptions[0].id;
        this.operation.show();
    }

    // Função para fechar o modal
    dismissModal() {
        this.operation.hide();
    }

    // Quando o usuário altera o valor do input
    // a função recebe esse valor e exibe na UI
    // o valor com o cálculo já realizado, para
    // dar uma UX melhor.
    onKey(value) {
        this.values = this.calculateValue(value);
    }

    // Quando o usuário troca o tipo de moeda
    // os inputs são atualizados e o valores
    // resetados para evitar confusões
    onChange(currencyId) {
        this.currencyOption = currencyId;
        this.quantityOption = '';
        this.values = 0;
    }

    // Recebe os valores do formulário
    // Faz o cálculo novamente
    // Desconta o valor total ou acrescenta
    onSubmit(form: NgForm) {
        const messageListRef = this.angularFire.database.ref(`${this.userId}/moedas/0`);
        debugger;
        this.angularFire.list(`${this.userId}/historico`).push(
            {
                createDate: `${Date.parse(new Date().toString())}`,
                currencyId: form.value.currency,
                currencyName: this.currencyOptions[form.value.currency].currency,
                quantity: form.value.quantity,
                value: this.calculateValue(form.value.quantity)
            }
        ).then((t: any) => console.log('dados gravados: ' + t.key)),

        this.angularFire.object(`${this.userId}/moedas/${form.value.currency}`).update(
            {
                currencyName: this.currencyOptions[form.value.currency].currency,
                currentlyValue: form.value.quantity
            }
        );

        this.currencyOption = this.currencyOptions[0].id;
        form.controls.quantity.setValue('');
        this.values = 0;
        this.dismissModal();
    }

    // Calcula o valor de acordo com a
    // moeda selecionada e retornao total
    calculateValue(value) {
        if (this.currencyOption == 0) {
            return value;
        } else if (this.currencyOption == 1) {
            return value * this.currencies[0].valor;
        } else {
            return value * this.currencies[1].valor;
        }
    }

}
