import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';

import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CustomerComponent } from './pages/customer/customer.component';
import {AuthState} from "./auth/storage/state";
import {NgxsModule} from "@ngxs/store";
import {NgxsStoragePluginModule} from "@ngxs/storage-plugin";
import {ToastModule} from 'primeng/toast';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {MessageService} from "primeng/api";
import {BasketComponent} from "./pages/basket/basket.component";
import { AdminComponent } from './pages/admin/admin.component';
import { SubmitOrderComponent } from './pages/submit-order/submit-order.component';
import { AddProdOfferComponent } from './pages/add-prod-offer/add-prod-offer.component';
import { UpdateProdOfferComponent } from './pages/update-prod-offer/update-prod-offer.component';


@NgModule({
  declarations: [AppComponent, CustomerComponent, BasketComponent, AdminComponent, SubmitOrderComponent, AddProdOfferComponent, UpdateProdOfferComponent, ],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
    BrowserAnimationsModule,
    ButtonModule,
    RippleModule,


    NgxsModule.forRoot([AuthState]),

    NgxsStoragePluginModule.forRoot({
      key: 'auth.token'
    }),
  ],

  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
