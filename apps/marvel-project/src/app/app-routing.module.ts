import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { AdminComponent } from './pages/admin/admin.component';
import { SubmitOrderComponent } from './pages/submit-order/submit-order.component';
import { CustomerComponent } from './pages/customer/customer.component';
import {AddProdOfferComponent} from "./pages/add-prod-offer/add-prod-offer.component";
import {UpdateProdOfferComponent} from "./pages/update-prod-offer/update-prod-offer.component";

const routes: Routes = [
  { path: '', component: LoginComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'dashboard', component: CustomerComponent },
  { path: 'submit', component: SubmitOrderComponent },
  { path: 'add-Offer', component: AddProdOfferComponent },
  { path: 'update-Offer', component: UpdateProdOfferComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
