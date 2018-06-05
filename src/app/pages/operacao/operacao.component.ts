import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { OperacaoModalComponent } from './operacao-modal/operacao-modal.component';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import * as $ from 'jquery';

@Component({
    selector: 'app-operacao',
    templateUrl: './operacao.component.html',
    providers: [AngularFireDatabase, AngularFireAuth],
    encapsulation: ViewEncapsulation.None
})
export class OperacaoComponent implements OnInit {
    @ViewChild(OperacaoModalComponent) modalComponent: OperacaoModalComponent;
    public userId;
    public currencies;
    public isLoaded = false;
    public today = Date.now();

    constructor(private angularFire: AngularFireDatabase, private afAuth: AngularFireAuth) { }

    ngOnInit() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.userId = user.uid;
            }
            // Pega os valores de moedas
            this.angularFire.list(`${this.userId}/moedas`).valueChanges().subscribe(
                currencies => {
                    this.currencies = currencies;
                    this.isLoaded = true;
                }
            );
        });
    }

    showModal(type) {
        this.modalComponent.showModal(type);
        this.showOptions();
    }

    showOptions() {
        $('#js-fabButton').toggleClass('down');
        $('#js-fabOptions').fadeToggle();
    }

}
