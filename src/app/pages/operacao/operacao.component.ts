import { TrocaOperacaoComponent } from './troca-operacao/troca-operacao.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { OperacaoModalComponent } from './operacao-modal/operacao-modal.component';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { SharedService } from '../shared/shared.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-operacao',
    templateUrl: './operacao.component.html',
    providers: [AngularFireDatabase, AngularFireAuth, SharedService],
    encapsulation: ViewEncapsulation.None
})
export class OperacaoComponent implements OnInit {

    @ViewChild(OperacaoModalComponent) modalComponent: OperacaoModalComponent;
    @ViewChild(TrocaOperacaoComponent) changeModalComponent: TrocaOperacaoComponent;

    private currencySubscription: Subscription;
    public userId;
    public userCurrencies;
    public currenciesValue;
    public isLoaded = false;
    public today = Date.now();

    constructor(private angularFire: AngularFireDatabase, private afAuth: AngularFireAuth, public _sharedService: SharedService) { }

    ngOnInit() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.userId = user.uid;
            }
            // Pega as moedas do usuario
            this.angularFire.list(`${this.userId}/moedas`).valueChanges().subscribe(
                userCurrencies => {
                    this.userCurrencies = userCurrencies;
                    this.isLoaded = true;
                }
            );
        });
        this.getCurrenciesValue();
    }

    // Busca o preço de
    // todas as moedas
    getCurrenciesValue() {
        this.currencySubscription = this._sharedService.getCurrencies()
            .subscribe(
                currenciesValue => {
                    // Subscribe em currencies e popula o objeto currencies.
                    // A API utilizada retorna um Objeto e para que seja feita a
                    // iteração dos valores, é necessário converter em um Array.
                    this.currenciesValue = [
                        {
                            valor: 1,
                            data: this._sharedService.convertDate(this.today)
                        },
                        {
                            valor: currenciesValue['valores']['USD'].valor,
                            data: this._sharedService.convertDate(currenciesValue['valores']['USD'].ultima_consulta),
                            icon: 'icon-dollar-sign'
                        }, {
                            valor: currenciesValue['valores']['BTC'].valor,
                            data: this._sharedService.convertDate(currenciesValue['valores']['BTC'].ultima_consulta),
                            icon: 'icon-bitcoin'
                        }
                    ];
                },
                err => console.log(err)
            );
    }

    showModal(type) {
        this.modalComponent.showModal(type, this.currenciesValue, this.userCurrencies, this.userId);
        this.showOptions();
    }

    showChangeModal() {
        this.changeModalComponent.showModal(this.currenciesValue, this.userCurrencies);
        this.showOptions();
    }

    showOptions() {
        $('#js-fabButton').toggleClass('down');
        $('#js-fabOptions').fadeToggle();
    }

}
