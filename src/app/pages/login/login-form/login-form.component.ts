import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    providers: [AngularFireAuth],
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

    constructor(private afAuth: AngularFireAuth, private router: Router) { }

    ngOnInit() {
    }

    onSubmit(f: NgForm) {
        console.log('Olhando o console ne! Aguenta ai malandrão, ja que vai ser implementado isso');
        // if (!f.valid) {
        //     return;
        // }
        // this.afAuth.auth.signInWithEmailAndPassword(f.controls.email.value, f.controls.senha.value)
        //     .then(ok => {
        //         this.router.navigate(['/home']);
        //     });

        // f.controls.email.setValue('');
        // f.controls.senha.setValue('');
    }

    form_logout(){
        this.afAuth.auth.signOut();
        this.router.navigate(['/operacao']);
    }

}
