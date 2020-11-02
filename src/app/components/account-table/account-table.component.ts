import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';
import { Account } from '../../models/account';

@Component({
  selector: 'app-account-table',
  templateUrl: './account-table.component.html',
  styleUrls: ['./account-table.component.scss']
})
export class AccountTableComponent implements OnInit {

  searchValue = '';
  accounts$: Observable<Account[]>;

  constructor(
    private accountService: AccountService
  ) {
  }

  ngOnInit(): void {
    this.fetchClients();
  }

  fetchClients(): void {
    this.accounts$ = this.accountService.getAccounts();
  }

  filter(): void {
    if (this.searchValue) {
      // this.accounts$ = this.accountService.getAccounts()
      // .pipe(
      //   map( accouts => {
      //     const result =  accouts.filter( c =>
      //       c.name.toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase())
      //       ||  c.lastName.toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase())
      //       || c.cedula.toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase())
      //     );
      //     console.log(result);
      //     return result;
      //   }),
      // );
    } else {
      this.accounts$ = this.accountService.getAccounts();
    }
  }

}
