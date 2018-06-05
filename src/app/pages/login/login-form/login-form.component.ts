import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

import { AngularFireDatabase } from 'angularfire2/database';

import { Observable } from 'rxjs';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    providers: [AngularFireAuth, AngularFireDatabase]
})
export class LoginFormComponent  {

    public password = '';
    constructor(private afAuth: AngularFireAuth, private router: Router, private angularFire: AngularFireDatabase) { }

    onSubmit(f: NgForm) {

        // Cria um novo usuário com os dados
        // passados pelo formulario HTML
        this.afAuth.auth.createUserWithEmailAndPassword(
            f.controls.email.value,
            f.controls.senha.value
        ).then(ok => {
            const moedas = [
                {currencyName: 'Real', currentlyValue: 100000},
                {currencyName: 'Brita', currentlyValue: 0},
                {currencyName: 'Bitcoin', currentlyValue: 0}
            ];

            // Cadastra os tipos de moedas
            this.angularFire.database.ref(`${ok.user.uid}`).child(`moedas`).set(moedas);

            // Limpa o formulário
            f.controls.email.setValue('');
            f.controls.senha.setValue('');

            // Redireciona para a tela de login
            this.router.navigate(['/']);
        });
    }
}
