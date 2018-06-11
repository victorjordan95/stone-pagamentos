import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers: [AngularFireAuth],
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

    public isLoaded;

    constructor(private afAuth: AngularFireAuth, private router: Router, private toastr: ToastrService) { }

    ngOnInit() {
        this.isLoaded = true;
    }

    onSubmit(f: NgForm) {
        this.isLoaded = false;
        if (!f.valid) {
            return;
        }
        this.afAuth.auth.signInWithEmailAndPassword(f.controls.email.value, f.controls.senha.value)
            .then(ok => {
                this.isLoaded = true;
                this.router.navigate(['/home']);
            })
            .catch(error => {
                if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-email') {
                    this.toastr.error('Usuário ou senha inválidos', 'Erro ao acessar!');
                } else if (error.code === 'auth/user-not-found') {
                    this.toastr.error('E-mail inválido', 'Erro ao acessar!');
                } else {
                    this.toastr.error('Ocorreu um erro ao acessar a aplicação', 'Erro ao acessar!');
                }
                this.isLoaded = true;
            });

        f.controls.email.setValue('');
        f.controls.senha.setValue('');
    }

    form_logout() {
        this.afAuth.auth.signOut();
        this.router.navigate(['']);
    }
}
