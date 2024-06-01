import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HomeComponent } from './customerLayout/home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SubscriptionTypePipe } from './shared/pipes/subscriptionTypePipe';
import { CustomerStatusDirective } from './shared/directives/customerStatus.directive';
import { ListPaymentComponent } from './customerLayout/list-payment/list-payment.component';
import { ListAccessComponent } from './customerLayout/list-access/list-access.component';
import { CustomerEditComponent } from './customerLayout/customer-edit/customer-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { DialogComponent } from './shared/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SubscriptionTypePipe,
    CustomerStatusDirective,
    HomeComponent,
    ListPaymentComponent,
    ListAccessComponent,
    CustomerEditComponent,
    LoginComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
