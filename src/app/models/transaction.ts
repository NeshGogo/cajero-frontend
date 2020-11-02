export interface Transaction {
  Id: number;
  AccountOrigen: string;
  AccountDestination: string;
  Amount: number;
  TransactionType: TransactionTypeEnum;
  TransactionDestination: TransactionDestionationEnum;
  CurrentBalance: number;
}

export enum TransactionTypeEnum {
  Withdraw = 1,
  Deposit = 2,
}

export enum TransactionDestionationEnum {
  Own = 1,
  Other = 2,
}
