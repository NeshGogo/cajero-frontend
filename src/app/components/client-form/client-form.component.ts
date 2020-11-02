import { Component, OnInit } from '@angular/core';

import { Client } from '../../models/client';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {

  client: Partial<Client> = {
    id: 0,
    name: '',
    lastName: '',
    cedula:  ''
  };

  constructor(
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.clientService.getClients()
    .subscribe(clients => console.log(clients));
  }

  sendClient(): void{
    const client = {...this.client};
    this.clientService.addClient(client).subscribe( response => console.log(response));
    this.client = {
      id: 0,
      name: '',
      lastName: '',
      cedula:  ''
    };
  }
}
