import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [AngularFireAuth]
})
export class NavbarComponent implements OnInit {

    constructor(private afAuth: AngularFireAuth, private router: Router) { }

    ngOnInit() {
    }

    form_logout() {
        this.afAuth.auth.signOut();
        this.router.navigate(['']);
    }

}
