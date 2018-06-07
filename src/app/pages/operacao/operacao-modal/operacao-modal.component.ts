import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from 'angularfire2/auth';
import { SharedService } from './../../shared/shared.service';
import { Subscription } from 'rxjs';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
    selector: 'app-operacao-modal',
    templateUrl: './operacao-modal.component.html',
    providers: [SharedService, AngularFireDatabase, AngularFireAuth],
    encapsulation: ViewEncapsulation.None
})
export class OperacaoModalComponent {
    @ViewChild('operationModal') operation: ModalDirective;

    private currencySubscription: Subscription;
    private userId;
    public isBuying;
    public currencies;
    public values = 0;
    public quantityOption = '';
    public currencyOptions;
    public currencyOption;
    public userCurrencies;

    constructor(public _sharedService: SharedService, private angularFire: AngularFireDatabase,
        private afAuth: AngularFireAuth, private toastr: ToastrService) { }

    // Função para inicializar o modal
    // this.currenciesValue, this.currencyOptions
    showModal(type, currenciesValue, userCurrencies, userId): void {
        this.userId = userId;
        this.currencyOptions = userCurrencies;
        // Inicializa o modal com a
        // primeira moeda selecionada
        this.currencyOption = userCurrencies[0].id;

        this.currencies = currenciesValue;
        type === 'compra' ? this.isBuying = true : this.isBuying = false;
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
        this.values = this._calculateValue(value);
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

        // Caso o usuário esteja
        // comprando real, o ato de comprar
        // deve apenas somar ao montante total
        if (this.currencyOptions[form.value.currency].currencyName === 'Real') {
            this._addCurrency(form);
            this._updateHistoric(form);
        } else {
            this._verifyAmount(form);
        }

        form.controls.quantity.setValue('');
        this.values = 0;
        this.dismissModal();
    }

    // Verificação se o saldo que o usuário
    // está comprando é menor do que ele possui
    _verifyAmount(form) {

        if (this._calculateValue(form.value.quantity) > this.currencyOptions[0].currentlyValue) {
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
        this._showMessage(this.currencyOptions[form.value.currency].currencyName);
    }

    // Atualiza o histórico com a operação
    // escolhida e com a moeda selecionada
    _updateHistoric(form) {
        this.angularFire.list(`${this.userId}/historico`).push(
            {
                createDate: `${Date.parse(new Date().toString())}`,
                operationType: `${this.isBuying ? 'Compra' : 'Venda'}`,
                currencyId: form.value.currency,
                currencyName: this.currencyOptions[form.value.currency].currencyName,
                quantity: form.value.quantity,
                value: this._calculateValue(form.value.quantity)
            }
        ).then((t: any) => console.log('dados gravados: ' + t.key));
    }

    // Recebe os valores do form para
    // atualizar a árvore selecionada
    _addCurrency(form) {
        if (this.isBuying) {
            this.angularFire.object(`${this.userId}/moedas/${form.value.currency}`).update(
                {
                    currencyName: this.currencyOptions[form.value.currency].currencyName,
                    currentlyValue: parseFloat(form.value.quantity) + parseFloat(this.currencyOptions[form.value.currency].currentlyValue)
                }
            );
        } else {
            this.angularFire.object(`${this.userId}/moedas/${form.value.currency}`).update(
                {
                    currencyName: this.currencyOptions[form.value.currency].currencyName,
                    currentlyValue: this._calculateValue(form.value.quantity) +
                        parseFloat(this.currencyOptions[form.value.currency].currentlyValue)
                }
            );
        }
    }

    // Remove da moeda escolhida como pagamento
    // o montante que foi calculado
    _removeCurrency(form) {
        // Caso seja compra, deve subtrair do Real
        // o valor convertido da moeda escolhida
        // para compra.
        if (this.isBuying) {
            this.angularFire.object(`${this.userId}/moedas/0`).update(
                {
                    currencyName: 'Real',
                    currentlyValue: parseFloat(this.currencyOptions[0].currentlyValue) -
                        this._calculateValue(form.value.quantity)
                }
            );

        } else {
            // Caso seja venda, deve subtrair
            // da moeda escolhida o valor,
            // converter para o real e adicionar
            // em no montante.
            this.angularFire.object(`${this.userId}/moedas/${form.value.currency}`).update(
                {
                    currencyName: this.currencyOptions[form.value.currency].currencyName,
                    currentlyValue: parseFloat(this.currencyOptions[form.value.currency].currentlyValue) - parseFloat(form.value.quantity)
                }
            );
        }
    }

    // Calcula o valor de acordo com a
    // moeda selecionada e retorna o total
    // convertido.
    _calculateValue(value: number) {
        return value * this.currencies[this.currencyOption].valor;
    }

    // Exibe mensagem de alerta
    _showMessage(moeda) {
        if (this.isBuying) {
            this.toastr.success(`Compra da moeda "${moeda}" foi realizada com sucesso `, 'Sucesso!');
        } else {
            this.toastr.success(`Venda da moeda "${moeda}" foi realizada com sucesso`, 'Sucesso!');
        }
    }

}
