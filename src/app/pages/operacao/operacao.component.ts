import { OperacaoModalComponent } from './operacao-modal/operacao-modal.component';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import * as $ from 'jquery';

@Component({
    selector: 'app-operacao',
    templateUrl: './operacao.component.html',
    encapsulation: ViewEncapsulation.None
})
export class OperacaoComponent implements OnInit {
    @ViewChild(OperacaoModalComponent) modalComponent: OperacaoModalComponent;

    constructor() { }

    ngOnInit() {

    }

    showModal(type) {
        debugger;
        this.modalComponent.showModal(type);
        this.showOptions();
    }

    showOptions() {
        $('#js-fabButton').toggleClass('down');
        $('#js-fabOptions').fadeToggle();
    }

}
