import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Client } from 'src/app/models/client';
import { Account } from '../../models/account';
import { AccountService } from '../../services/account.service';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss'],
})
export class AccountFormComponent implements OnInit {
  account: Partial<Account> = {
    accountNo: '',
    clientId: 0,
    balance: 0,
    alias: '',
  };

  clients: Partial<Client>[] = [];

  constructor(
    private accountService: AccountService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.fetchClients();
  }

  private fetchClients(): void {
    this.clientService
      .getClients()
      .pipe(
        map((clients) =>
          clients.map((c) => {
            const newClient: Partial<Client> = {
              id: c.id,
              lastName: c.lastName,
              name: c.name,
            };
            return newClient;
          })
        )
      )
      .subscribe((clients) => (this.clients = clients));
  }

  send(): void {
    const newAccount = { ...this.account };
    if (newAccount.balance < 10) {
      alert('debe Introducir un balance minimo de 10 pesos');
      return;
    }
    newAccount.clientId = Number(newAccount.clientId);
    newAccount.balance = Number(newAccount.balance);
    this.accountService
      .addAccount(newAccount)
      .subscribe((response) => console.log(response));
    this.account = {
      clientId: 0,
      balance: 0,
      alias: ''
    };
    alert('Cuenta registrada');
  }
}
