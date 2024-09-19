import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './customerLayout/home/home.component';
import { ListPaymentComponent } from './customerLayout/list-payment/list-payment.component';
import { ListAccessComponent } from './customerLayout/list-access/list-access.component';
import { CustomerEditComponent } from './customerLayout/customer-edit/customer-edit.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'list-payment', component: ListPaymentComponent, canActivate: [AuthGuard] },
  { path: 'list-access', component: ListAccessComponent, canActivate: [AuthGuard] },
  { path: 'customer-edit', component: CustomerEditComponent, canActivate: [AuthGuard] },
  { path: 'customer-edit/:id', component: CustomerEditComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
