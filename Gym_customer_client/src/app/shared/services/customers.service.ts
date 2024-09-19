import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { CustomerDetails } from '../model/customerDetails.model';
import { Observable, map } from 'rxjs';
import { PaymentDetails } from '../model/paymentDetails.model';
import { AccessDetails } from '../model/accessDetails.model';
import { SubscriptionDetails } from '../model/subscriptionDetails.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private serverUrl = environment.apiUrl;

  constructor(private http: HttpClient) { };

  getCustomers(currentPage: number, customerPerPage: number) {
    const queryParams = `?limit=${customerPerPage}&page=${currentPage}`;
    const url = `${this.serverUrl}/customers` + queryParams;
    return this.http.get<{ message: string; customers: CustomerDetails[]; countCustomer: number; }>(url);
  };

  getCustomerById(customerId: string): Observable<CustomerDetails> {
    const url = `${this.serverUrl}/customers/${customerId}`;
    return this.http.get<CustomerDetails>(url);
  };

  addCustomer(customer: any): Observable<CustomerDetails> {
    const url = `${this.serverUrl}/customers`;
    return this.http.post<CustomerDetails>(url, customer);
  };

  patchCustomer(customer: CustomerDetails) {
    const id = customer._id;
    const url = `${this.serverUrl}/customers/${id}`;
    return this.http.patch(url, customer);
  };

  getSubscription(): Observable<SubscriptionDetails[]> {
    return this.http.get<SubscriptionDetails[]>(`${this.serverUrl}/subscriptions`);
  }
}
