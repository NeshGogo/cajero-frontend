import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountFormComponent } from './components/account-form/account-form.component';
import { AccountTableComponent } from './components/account-table/account-table.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ClientTableComponent } from './components/client-table/client-table.component';
import { TransactionTableComponent } from './components/transaction-table/transaction-table.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { HomeComponent } from './components/home/home.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'clients',
    children: [
      {
        path: '',
        component: ClientTableComponent
      },
      {
        path: 'register',
        component: ClientFormComponent
      }
    ]
  },
  {
    path: 'accounts',
    children: [
      {
        path: '',
        component: AccountTableComponent
      },
      {
        path: 'register',
        component: AccountFormComponent
      },
    ]
  },
  {
    path: 'transactions',
    children: [
      {
        path: '',
        component: TransactionTableComponent
      },
      {
        path: 'register',
        component: TransactionFormComponent
      },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
