import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = 'http://localhost:3000/api/'; // Dirección de tu backend

  constructor(private http: HttpClient) {}

  // Enviar datos por POST
  post(endpoint: string, data: any): Promise<any> {
    return this.http.post(this.apiUrl + endpoint, data).toPromise();
  }

  // Obtener datos por GET
  get(endpoint: string): Promise<any> {
    return this.http.get(this.apiUrl + endpoint).toPromise();
  }
}
