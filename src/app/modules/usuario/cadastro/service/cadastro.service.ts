import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/shared/domains/usuario.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { endpoint } from 'src/endpoints/endpoints';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(private httpClient: HttpClient) { }

  put(object: Usuario, id: string): Observable<Usuario> {
    return this.httpClient.put<Usuario>(`${environment.url}/${endpoint.usuario}/${id}`, object);
  }

  post(object: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(`${environment.url}/${endpoint.usuario}`, object);
  }

}
