import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { ToastrService } from 'ngx-toastr';
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

    constructor(private angularFire: AngularFireDatabase,
        private afAuth: AngularFireAuth, private toastr: ToastrService) { }

    ngOnInit() {
    }

    // Função para inicializar o modal
    // recebe os valores das moedas e
    // as moedas que o usuário possui
    showModal(currenciesValue, userCurrencies, userId): void {
        this.userId = userId;
        this.currencyOptions = userCurrencies;

        // Inicializa o modal com a
        // primeira moeda selecionada
        this.currencyOption = userCurrencies[0].id;

        // Recebe a cotação
        this.currencies = currenciesValue;

        // Exibe o modal
        this.operation.show();
    }

    // Função para fechar o modal
    dismissModal() {
        this.operation.hide();
    }

    onSubmit(form: NgForm) {

        // Verifica se o usuário pode realizar 
        // a operação
        this._verifyAmount(form);

        // Limpa os valores
        form.controls.quantity.setValue('');
        this.values = 0;

        // Fecha o modal
        this.dismissModal();
    }

    onChange(currencyId) {
        this.currencyOption = currencyId;
    }

    _verifyAmount(form) {

        if (form.value.quantity > this.currencyOptions[form.value.currency]) {
            this.toastr.error('Saldo insuficiente para realizar esta operação', 'Erro na operação!');
            return;
        }

        // Adiciona a quantidade da moeda escolhida
        this._addCurrency(form);

        // Remove do real a quantidade
        // que será gasta
        this._removeCurrency(form);

        // Atualiza historico apenas
        // se a transação for concluida
        this._updateHistoric(form);
        this._showMessage(this.currencyOptions[form.value.currency].currencyName, 
            this.currencyOptions[form.value.currencyForChange].currencyName);
    }

    changeCurrency(currency) {
        this.currencyForChange = currency;
    }

    onKey(quantity) {
        this.values = this._calcDifference(quantity);
    }

    _updateHistoric(form) {
        this.angularFire.list(`${this.userId}/historico`).push(
            {
                createDate: `${Date.parse(new Date().toString())}`,
                operationType: `Troca`,
                currencyId: form.value.currency,
                currencyName: this.currencyOptions[form.value.currency].currencyName,
                changedFor: this.currencyOptions[form.value.currencyForChange].currencyName,
                quantity: form.value.quantity,
                value: this._calcDifference(form.value.quantity)
            }
        ).then((t: any) => console.log('dados gravados: ' + t.key));
    }

    // Recebe os valores do form para
    // atualizar a árvore selecionada
    _addCurrency(form) {
        this.angularFire.object(`${this.userId}/moedas/${form.value.currencyForChange}`).update(
            {
                currencyName: this.currencyOptions[form.value.currencyForChange].currencyName,
                currentlyValue: this._calcDifference(form.value.quantity) +
                    parseFloat(this.currencyOptions[form.value.currency].currentlyValue)
            }
        );
    }

    // Remove da moeda escolhida como troca
    // o montante que foi calculado
    _removeCurrency(form) {
        // Caso seja compra, deve subtrair do Real
        // o valor convertido da moeda escolhida
        // para compra.
        this.angularFire.object(`${this.userId}/moedas/${form.value.currency}`).update(
            {
                currencyName: this.currencyOptions[form.value.currency].currencyName,
                currentlyValue: parseFloat(this.currencyOptions[form.value.currency].currentlyValue) - form.value.quantity
            }
        );

    }

    _calcDifference(quantity: number) {
        return (quantity * this.currencies[this.currencyOption].valor) / this.currencies[this.currencyForChange].valor;
    }

    _showMessage(moeda, moedaTrocada) {
        this.toastr.success(`Troca da moeda "${moeda}" para "${moedaTrocada}" foi realizada com sucesso `, 'Sucesso!');
    }

}
