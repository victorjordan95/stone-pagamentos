import { LoginFormComponent } from './pages/login/login-form/login-form.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { CotacaoComponent } from './pages/cotacao/cotacao.component';
import { HistoricoComponent } from './pages/historico/historico.component';
import { OperacaoComponent } from './pages/operacao/operacao.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { OperacaoModalComponent } from './pages/operacao/operacao-modal/operacao-modal.component';

import { FirebaseConfig } from './../environments/firebase.config';
import { AngularFireModule } from 'angularfire2/index';
import { LoginComponent } from './pages/login/login.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { TrocaOperacaoComponent } from './pages/operacao/troca-operacao/troca-operacao.component';
import { IconsComponent } from './components/icons/icons.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        CotacaoComponent,
        HistoricoComponent,
        OperacaoComponent,
        OperacaoModalComponent,
        LoginComponent,
        LoginFormComponent,
        TrocaOperacaoComponent,
        IconsComponent,
        LoaderComponent
    ],
    imports: [
        BrowserModule,
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        ModalModule.forRoot(),
        AngularFireModule.initializeApp(FirebaseConfig),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            preventDuplicates: true,
            progressBar: true,
            tapToDismiss: true,
            closeButton: true
        }),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
