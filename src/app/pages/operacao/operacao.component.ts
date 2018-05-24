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
        $(document).ready(function () {
            $('#js-operationBtn').click(function () {
                $('#js-fabOptions').fadeToggle();
            });
        });

    }


    showModal() {
        console.log('entrei no primeiro');
        this.modalComponent.showModal();
    }

    openOptions() {
        const list = document.getElementById('options');
    }

    toggle() {
        this.show = !this.show;

        // CHANGE THE NAME OF THE BUTTON.
        if (this.show) {
            this.buttonName = 'Hide';
        } else {
            this.buttonName = 'Show';
        }
    }

}
