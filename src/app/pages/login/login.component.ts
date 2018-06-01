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

    constructor(private afAuth: AngularFireAuth, private router: Router) { }

    ngOnInit() {
    }

    onSubmit(f: NgForm) {
        if (!f.valid) {
            return;
        }
        this.afAuth.auth.signInWithEmailAndPassword(f.controls.email.value, f.controls.senha.value)
            .then(ok => {
                this.router.navigate(['/home']);
            })
            .catch(error => {
                console.log(error);
            });

        f.controls.email.setValue('');
        f.controls.senha.setValue('');
    }

    form_logout() {
        this.afAuth.auth.signOut();
        this.router.navigate(['']);
    }
}
