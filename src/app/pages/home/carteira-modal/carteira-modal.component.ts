import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-carteira-modal',
    templateUrl: './carteira-modal.component.html'
})
export class CarteiraModalComponent {
    @ViewChild('carteiraModal') carteiraModal: ModalDirective;

    constructor() { }

    showModal(): void {
        this.openModal();
    }

    openModal() {
        this.carteiraModal.show();
    }

    dismissModal() {
        this.carteiraModal.hide();
    }

}
