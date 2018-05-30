import { LoginFormComponent } from './pages/login/login-form/login-form.component';
import { LoginComponent } from './pages/login/login.component';
import { HistoricoComponent } from './pages/historico/historico.component';
import { OperacaoComponent } from './pages/operacao/operacao.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CotacaoComponent } from './pages/cotacao/cotacao.component';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'cadastro', component: LoginFormComponent },
    { path: 'home', component: HomeComponent },
    { path: 'cotacao', component: CotacaoComponent },
    { path: 'operacao', component: OperacaoComponent },
    { path: 'historico', component: HistoricoComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
