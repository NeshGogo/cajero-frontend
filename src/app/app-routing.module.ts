import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountFormComponent } from './components/account-form/account-form.component';
import { AccountTableComponent } from './components/account-table/account-table.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ClientTableComponent } from './components/client-table/client-table.component';
import { TransactionTableComponent } from './components/transaction-table/transaction-table.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { LayoutComponent } from './layout/layout.component';
const routes: Routes = [
  {
    path: './',
    component: LayoutComponent
  },
  {
    path: 'clients',
    component: ClientTableComponent
  },
  {
    path: 'clients/register',
    component: ClientFormComponent
  },
  {
    path: 'accounts',
    component: AccountTableComponent
  },
  {
    path: 'accounts/register',
    component: AccountFormComponent
  },
  {
    path: 'transactions',
    component: TransactionTableComponent
  },
  {
    path: 'transactions/register',
    component: TransactionFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
