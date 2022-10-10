import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {CustomerComponent} from "../pages/customer/customer.component";


const routes: Routes = [
 { path: '', component: LoginComponent },
 {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},

  {path:"dashboard",component:CustomerComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
