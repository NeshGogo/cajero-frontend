export interface Transaction {
  id: number;
  accountOrigen: string;
  accountDestination: string;
  amount: number;
  transactionType: TransactionTypeEnum;
  transactionDestination: TransactionDestionationEnum;
  currentBalance: number;
}

export enum TransactionTypeEnum {
  withdraw = 1,
  deposit = 2,
}

export enum TransactionDestionationEnum {
  own = 1,
  other = 2,
}
