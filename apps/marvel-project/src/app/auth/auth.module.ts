import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import {AuthState} from "./storage/state";
import {NgxsStoragePluginModule} from "@ngxs/storage-plugin";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastModule} from "primeng/toast";



@NgModule({
  declarations: [LoginComponent, RegisterComponent],
    imports: [CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        NgxsModule.forRoot([AuthState]),
        NgxsStoragePluginModule.forRoot({
            key: ['auth.token', 'auth.email', 'auth.name']
        }),
        HttpClientModule,
        FormsModule, ToastModule
    ],
  exports: [LoginComponent,RegisterComponent],
})

export class AuthModule {}
