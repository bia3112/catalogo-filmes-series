import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {FilmeSerie} from './filme-serie';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  private httpClient = inject(HttpClient);

  consultarCatalogo(titulo: string): Observable<any> {
    const apiKey = '4cae56a2';
    const url = `https://www.omdbapi.com/?s=${encodeURIComponent(titulo)}&apikey=${apiKey}`;
    return this.httpClient.get(url);
  }

  consultarDetalhes(id: string): Observable<FilmeSerie> {
    const apiKey = '4cae56a2';
    const url = `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`;
    return this.httpClient.get<any>(url).pipe(
      map((item) => ({
        titulo: item.Title,
        ano: item.Year,
        classificacao: item.Rated,
        dataLancamento: item.Released,
        tempo: item.Runtime,
        genero: item.Genre,
        diretor: item.Director,
        escritor: item.Writer,
        sinopse: item.Plot,
        linguagem: item.Language,
        pais: item.Country,
        premios: item.Awards,
        poster: item.Poster
      }))
    );
  }


}
