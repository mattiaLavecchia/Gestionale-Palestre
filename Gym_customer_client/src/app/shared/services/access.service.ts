import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AccessDetails } from '../model/accessDetails.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessService {
  private serverUrl = environment.apiUrl;

  constructor(private http: HttpClient) { };

  getAccesses(currentPage: number, accessPerPage: number): Observable<{ message: string; accesses: AccessDetails[]; countAccess: number; }> {
    const queryParams = `?limit=${accessPerPage}&page=${currentPage}`;
    const url = `${this.serverUrl}/access` + queryParams;
    return this.http.get<{ message: string; accesses: AccessDetails[]; countAccess: number; }>(url);
  };

  getAccessById(id: string): Observable<AccessDetails> {
    const url = `${this.serverUrl}/access/${id}`;
    return this.http.get<AccessDetails>(url);
  };

  addAccess(idCustomer: string): Observable<any> {
    const url = `${this.serverUrl}/access`;
    return this.http.post(url, { customer: idCustomer });
  };

  deleteAccess(id: string): Observable<any> {
    const url = `${this.serverUrl}/access/${id}`;
    return this.http.delete(url);
  };

}
