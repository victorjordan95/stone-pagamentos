import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    providers: [AngularFireDatabase, AngularFireAuth],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
    public userId;
    public currencies;
    public isLoaded = false;
    public today = Date.now();

    constructor(private angularFire: AngularFireDatabase, private afAuth: AngularFireAuth) {
    }

    ngOnInit() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.userId = user.uid;
            }
            // Pega os valores de moedas
            this.angularFire.list(`${this.userId}/moedas`).valueChanges().subscribe(
                currencies => {
                    this.currencies = currencies;
                    console.log(currencies);
                    this.isLoaded = true;
                }
            );
        });
    }

}
