import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoint } from 'src/endpoints/endpoints';
import { environment } from 'src/environments/environment';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(private httpClient: HttpClient) { }

  get(): Observable<Array<Produto>> {
    return this.httpClient.get<Array<Produto>>(`${environment.url}/${endpoint.produtos}`);
  }

  delet(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.url}/${endpoint.produtos}/${JSON.stringify(id)}`);
  }

  getById(id: string) {
    return this.httpClient.get<Produto>(`${environment.url}/${endpoint.produtos}/${id}`);
  }

  post(object: Produto): Observable<Produto> {
    return this.httpClient.post<Produto>(`${environment.url}/${endpoint.produtos}`, object);
  }

  putCarrinho(idUser: string, prod: Produto): Observable<any> {
    return this.httpClient.put<any>(`${environment.url}/${endpoint.usuario}/${endpoint.produtos}/${idUser}`, prod);
  }

  put(object: Produto, id: string): Observable<Produto> {
    return this.httpClient.put<Produto>(`${environment.url}/${endpoint.produtos}/${id}`, object);
  }

}
