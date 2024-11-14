import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  private httpClient = inject(HttpClient);

  consultarCatalogo(titulo: string):Observable<any> {
    const apiKey = '4cae56a2';  // Sua chave de API
    const url = `https://www.omdbapi.com/?s=${encodeURIComponent(titulo)}&apikey=${apiKey}`;
    return this.httpClient.get(url);
  }

}
