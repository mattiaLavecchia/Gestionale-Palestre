import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SubscriptionDetails } from '../model/subscriptionDetails.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private serverUrl = environment.apiUrl;

  constructor(private http: HttpClient) { };

  getSubscriptions(): Observable<SubscriptionDetails[]> {
    const url = `${this.serverUrl}/subscriptions`;
    return this.http.get<SubscriptionDetails[]>(url);
  };

  getSubscriptionById(id: string): Observable<SubscriptionDetails> {
    const url = `${this.serverUrl}/subscriptions/${id}`;
    return this.http.get<SubscriptionDetails>(url);
  };

  addSubscription(subscription: SubscriptionDetails): Observable<SubscriptionDetails> {
    const url = `${this.serverUrl}/subscriptions`;
    return this.http.post<SubscriptionDetails>(url, subscription);
  };

  deleteSubscription(id: string): Observable<any> {
    const url = `${this.serverUrl}/subscriptions/${id}`;
    return this.http.delete(url);
  };

}
