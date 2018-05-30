import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [LoginFormComponent, LoginComponent],
    exports: [LoginComponent, LoginFormComponent],
    providers: [AngularFireAuth]
})
export class LoginModule { }
