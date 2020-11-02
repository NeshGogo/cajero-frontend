import { Client } from './client';

export interface Account {
  accountNo: string;
  balance: number;
  clientId: number;
  alias: string;
  client: Client;
  deleted: boolean;
}
