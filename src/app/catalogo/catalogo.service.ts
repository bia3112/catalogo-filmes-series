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
    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(titulo)}&apikey=${apiKey}`;
    return this.httpClient.get<any>(url).pipe(
      map((data) => ({
        titulo: data.Title,
        ano: data.Year,
        classificacao: data.Rated,
        dataLancamento: data.Released,
        tempo: data.Runtime,
        genero: data.Genre,
        diretor: data.Director,
        escritor: data.Writer,
        sinopse: data.Plot,
        linguagem: data.Language,
        pais: data.Country,
        premios: data.Awards,
        poster: data.Poster
      }))
    );
  }

}
