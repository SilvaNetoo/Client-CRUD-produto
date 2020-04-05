import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/shared/domains/usuario.model';
import { endpoint } from 'src/endpoints/endpoints';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  get(object: Usuario): Observable<Usuario> {
    let param = new HttpParams()
      .append('email', object.email)
      .append('senha', object.senha);
    return this.httpClient.get<Usuario>(`${environment.url}/${endpoint.usuario}`, { params: param });
  }

}
