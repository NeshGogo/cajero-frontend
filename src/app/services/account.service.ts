import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from '../models/account'

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(
    private http: HttpClient
  ) { }

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${environment.apiUrl}/Accounts`);
  }

  getAccount(cedula: string): Observable<Account> {
    return this.http.get<Account>(`${environment.apiUrl}/Accounts/${cedula}`);
  }

  addAccount(account: Partial<Account>): Observable<Account>{
    const url = `${environment.apiUrl}/accounts`;
    console.log(account);
    return this.http.post<Account>(url, account );
  }
}
