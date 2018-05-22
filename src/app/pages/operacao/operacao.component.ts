import { OperacaoModalComponent } from './operacao-modal/operacao-modal.component';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';

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

    showModal() {
        console.log('entrei no primeiro');
        this.modalComponent.showModal();
    }

}
