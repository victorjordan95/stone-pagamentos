import { AngularFireDatabase } from 'angularfire2/database';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    providers: [AngularFireAuth, AngularFireDatabase]
})
export class LoginFormComponent implements OnInit {

    constructor(private afAuth: AngularFireAuth, private router: Router, private angularFire: AngularFireDatabase) { }

    ngOnInit() {
    }

    onSubmit(f: NgForm) {

        // Cria um novo usuário com os dados
        // passados pelo form
        this.afAuth.auth.createUserWithEmailAndPassword(
            f.controls.email.value,
            f.controls.senha.value
        ).then(ok => {

            // Adiciona na "árvore" do novo usuário
            // o valor de 100.000 reais.
            this.angularFire.list(`${ok.user.uid}/moedas/real`).push(
                {
                    currencyName: 'Real',
                    currentlyValue: 100000
                }
            ).then((t: any) => {
                // Se tudo estiver certo, o usuário
                // será enviado para a tela de login
                this.router.navigate(['/']);
            });
        });

        // Limpa o formulário
        f.controls.email.setValue('');
        f.controls.senha.setValue('');
    }
}
