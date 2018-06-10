import { map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-historico',
    templateUrl: './historico.component.html',
    providers: [AngularFireDatabase, AngularFireAuth]
})
export class HistoricoComponent implements OnInit {

    public userId;
    public data;
    public dataList = [];
    public items;
    public isLoaded = false;
    historicoRef: AngularFireList<any[]>;
    historico: Observable<any[]>;

    constructor(private angularFire: AngularFireDatabase, private afAuth: AngularFireAuth ) {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.userId = user.uid;
            }
            // Pega os valores de historico e adiciona em
            // um Array de trás para frente. Desta forma os
            // dados ficam organizados de forma cronológica.
            angularFire.list(`${this.userId}/historico`).valueChanges().subscribe(
                items => {
                    this.items = items.reverse();
                    this.isLoaded = true;
                    console.log(this.items);
                }
            );
        });
    }

    ngOnInit() {
        // this.data = this.angularFire.list(`${this.userId}`).valueChanges().subscribe(items => {
        //     console.log(items);
        // });
    }

}
