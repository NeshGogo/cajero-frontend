import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionService } from '../../services/transaction.service';
import { Transaction, TransactionDestionationEnum, TransactionTypeEnum } from '../../models/transaction';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.scss']
})
export class TransactionTableComponent implements OnInit {

  searchValue = '';
  transactions$: Observable<Transaction[]>;

  constructor(
    private transactionService: TransactionService
  ) {
  }

  ngOnInit(): void {
    this.fetchClients();
  }

  fetchClients(): void {
    this.transactions$ = this.transactionService.getTransaciions();
  }

  filter(): void {
    if (this.searchValue) {
      this.transactions$ = this.transactionService.getTransaciions()
      .pipe(
        map( transactions => {
          const result =  transactions.filter( tran =>
            tran.AccountOrigen.toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase())
            ||  tran.AccountDestination.toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase())
            || (typeof this.searchValue === 'number' ? tran.Amount === parseFloat(this.searchValue) : false)
          );
          return result;
        }),
      );
    } else {
      this.transactions$ = this.transactionService.getTransaciions();
    }
  }

}
