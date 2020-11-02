import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Client } from '../models/client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private http: HttpClient
  ) { }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${environment.apiUrl}/clients`);
  }

  getClient(cedula: string): Observable<Client> {
    return this.http.get<Client>(`${environment.apiUrl}/clients/${cedula}`);
  }

  addClient(client: Partial<Client>): Observable<Client>{
    const url = `${environment.apiUrl}/clients`;

    return this.http.post<Client>(url, client );
  }

}
