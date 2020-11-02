import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  Transaction,
  TransactionTypeEnum,
  TransactionDestionationEnum,
} from 'src/app/models/transaction';
import { AccountService } from 'src/app/services/account.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { Account } from '../../models/account';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
})
export class TransactionFormComponent implements OnInit {
  transaction: Partial<Transaction> = {
    id: 0,
    accountOrigen: '',
    accountDestination: '',
    amount: 0,
    transactionType: 0,
    transactionDestination: 0,
    currentBalance: 0,
  };

  accounts: Partial<Account>[] = [];
  transactionTypes = Object.keys(TransactionDestionationEnum)
    .slice(Object.keys(TransactionDestionationEnum).length / 2)
    .map((key) => {
      return {
        value: key,
        id: TransactionDestionationEnum[key],
      };
    });

  transactionOperations = Object.keys(TransactionTypeEnum)
    .slice(Object.keys(TransactionTypeEnum).length / 2)
    .map((key) => {
      return {
        value: key,
        id: TransactionTypeEnum[key],
      };
    });

  private showDestinationAccount = false;

  constructor(
    private accountService: AccountService,
    private transactionService: TransactionService
  ) {}

  get getShowDestinationAccount(): boolean {
    return this.showDestinationAccount;
  }

  ngOnInit(): void {
    this.fetchAccounts();
  }

  private fetchAccounts(): void {
    this.accountService
      .getAccounts()
      .pipe(
        map((accounts) =>
          accounts.map((ac) => {
            const newClient: Partial<Account> = {
              accountNo: ac.accountNo,
              alias: ac.accountNo,
              balance: ac.balance,
              client: ac.client,
            };
            return newClient;
          })
        )
      )
      .subscribe((accounts) => (this.accounts = accounts));
  }

  onChangeTransactionType(): void {
    this.showDestinationAccount =
      Number(this.transaction.transactionDestination) ===
      TransactionDestionationEnum.other;
    if (this.showDestinationAccount) {
      this.transaction.transactionType = TransactionTypeEnum.withdraw;
    }
  }

  private cleanForm(): void {
    this.transaction = {
      id: 0,
      accountOrigen: '',
      accountDestination: '',
      amount: 0,
      transactionType: 0,
      transactionDestination: 0,
      currentBalance: 0,
    };
  }

  send(): void {
    const newTransaction = { ...this.transaction };
    newTransaction.transactionDestination = Number(
      newTransaction.transactionDestination
    );
    newTransaction.transactionType = Number(newTransaction.transactionType);
    newTransaction.amount = Number(newTransaction.amount);
    const origenAccount = this.accounts.filter(
      (acc) => acc.accountNo === newTransaction.accountOrigen
    )[0];
    if (
      newTransaction.transactionType === TransactionTypeEnum.withdraw &&
      origenAccount.balance < newTransaction.amount
    ) {
      alert('El monto es mayor que el balance de la cuenta');
      return;
    }
    this.transactionService
      .addTransaction(this.transaction)
      .subscribe((response) => console.log(response));
    console.log(newTransaction);
    this.cleanForm();
    alert('Transaccion registrada');
  }
}
