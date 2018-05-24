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

    public show = false;
    public buttonName = 'Show';

    constructor() { }

    ngOnInit() {
        // Assim que iniaciliza, adiciona a funcionalidade
        // do botão flutuante na página para exibir as demais opções
        $(document).ready(function () {
            $('#js-operationBtn').click(function () {
                $('#js-fabOptions').fadeToggle();
                $(this).toggleClass('down');
            });
        });

    }

    showModal() {
        this.modalComponent.showModal();
        $('#js-operationBtn').click();
    }

}
