import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { CarteiraModalComponent } from './carteira-modal/carteira-modal.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

    @ViewChild(CarteiraModalComponent) modalComponent: CarteiraModalComponent;

    constructor() { }

    ngOnInit() {
    }

    showModal() {
        console.log('entrei no primeiro');
        this.modalComponent.showModal();
    }

}
