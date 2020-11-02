import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountFormComponent } from './components/account-form/account-form.component';
import { AccountTableComponent } from './components/account-table/account-table.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ClientTableComponent } from './components/client-table/client-table.component';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
