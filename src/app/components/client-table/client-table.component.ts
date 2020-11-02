import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from 'src/app/models/client';

import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.scss']
})
export class ClientTableComponent implements OnInit {
  searchValue = '';
  clients$: Observable<Client[]>;

  constructor(
    private clientService: ClientService
  ) {
  }

  ngOnInit(): void {
    this.fetchClients();
  }

  fetchClients(): void {
    this.clients$ = this.clientService.getClients();
  }

  filter(): void {
    if (this.searchValue) {
      this.clients$ = this.clientService.getClients()
      .pipe(
        map( clients => {
          const result =  clients.filter( c =>
            c.name.toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase())
            ||  c.lastName.toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase())
            || c.cedula.toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase())
          );
          console.log(result);
          return result;
        }),
      );
    } else {
      this.clients$ = this.clientService.getClients();
    }
  }
}
