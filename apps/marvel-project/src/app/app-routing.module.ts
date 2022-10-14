import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import {AdminComponent} from "./pages/admin/admin.component";
import {SubmitOrderComponent} from "./pages/submit-order/submit-order.component";

const routes: Routes = [
  { path: '', component: LoginComponent },

  {path:"login",component:LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'submit', component: SubmitOrderComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
