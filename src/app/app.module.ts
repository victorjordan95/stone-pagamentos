import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { CotacaoComponent } from './pages/cotacao/cotacao.component';
import { HistoricoComponent } from './pages/historico/historico.component';
import { OperacaoComponent } from './pages/operacao/operacao.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        CotacaoComponent,
        HistoricoComponent,
        OperacaoComponent,
    ],
    imports: [
        BrowserModule,
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
