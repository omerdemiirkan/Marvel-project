import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {CustomerComponent} from "../pages/customer/customer.component";
import {AdminComponent} from "../pages/admin/admin.component";


const routes: Routes = [
 { path: '', component: LoginComponent },
 {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  { path: 'admin', component: AdminComponent },
  {path:"dashboard",component:CustomerComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
