import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionService } from '../../services/transaction.service';
import {
  Transaction,
  TransactionDestionationEnum,
  TransactionTypeEnum,
} from '../../models/transaction';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.scss'],
})
export class TransactionTableComponent implements OnInit {
  searchValue = '';
  transactions$: Observable<Transaction[]>;

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.fetchClients();
  }

  fetchClients(): void {
    this.transactions$ = this.transactionService.getTransaciions();
  }

  getTransactionOperationType(value: number): string {
    return TransactionTypeEnum[value].toString();
  }
  getTransactionType(value: number): string {
    return TransactionDestionationEnum[value].toString();
  }
  filter(): void {
    if (this.searchValue) {
      this.transactions$ = this.transactionService.getTransaciions().pipe(
        map((transactions) => {
          const result = transactions.filter(
            (tran) =>
              tran.accountOrigen
                .toLocaleLowerCase()
                .includes(this.searchValue.toLocaleLowerCase()) ||
              tran.accountDestination
                .toLocaleLowerCase()
                .includes(this.searchValue.toLocaleLowerCase()) ||
              tran.amount === Number(this.searchValue) ||
              tran.currentBalance === Number(this.searchValue) ||
              TransactionDestionationEnum[tran.transactionDestination]
                .toString()
                .toLocaleLowerCase()
                .includes(this.searchValue.toLocaleLowerCase()) ||
              TransactionTypeEnum[tran.transactionType]
                .toString()
                .toLocaleLowerCase()
                .includes(this.searchValue.toLocaleLowerCase())
          );
          return result;
        })
      );
    } else {
      this.transactions$ = this.transactionService.getTransaciions();
    }
  }
}
