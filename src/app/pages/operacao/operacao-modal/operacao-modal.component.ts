import { ModalDirective } from 'ngx-bootstrap/modal';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';

@Component({
    selector: 'app-operacao-modal',
    templateUrl: './operacao-modal.component.html',
    encapsulation: ViewEncapsulation.None
})
export class OperacaoModalComponent implements OnInit {
    @ViewChild('operationModal') operation: ModalDirective;

    constructor() { }

    ngOnInit() {
    }

    showModal(): void {
        this.openModal();
    }

    openModal() {
        this.operation.show();
    }

    dismissModal() {
        this.operation.hide();
    }

}
