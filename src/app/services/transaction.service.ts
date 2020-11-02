import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Transaction,
  TransactionDestionationEnum,
  TransactionTypeEnum,
} from '../models/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) {}

  getTransaciions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${environment.apiUrl}/transactions`);
  }

  getTransaction(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(`${environment.apiUrl}/transactions/${id}`);
  }

  addTransaction(transaction: Partial<Transaction>): Observable<Transaction> {
    const url = `${environment.apiUrl}/transactions`;
    return this.http.post<Transaction>(url, transaction);
  }
}
