import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {FilmeSerie} from './filme-serie';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  private httpClient = inject(HttpClient);

  private readonly apiKey = '4cae56a2';
  private readonly baseUrl = 'https://www.omdbapi.com';

  private readonly favoritosKey = 'favoritos';

  consultarCatalogo(titulo: string): Observable<any> {
    const url = `${this.baseUrl}/?s=${encodeURIComponent(titulo)}&apikey=${this.apiKey}`;
    return this.httpClient.get<any>(url).pipe(
      map((response) => {
        if (response.Error) {
          throw new Error(response.Error); // Lança o erro da API
        }
        return response;
      })
    );
  }

  consultarDetalhes(id: string): Observable<FilmeSerie> {
    const url = `${this.baseUrl}/?i=${id}&apikey=${this.apiKey}`;
    return this.httpClient.get<any>(url).pipe(
      map((item) => {
        if (item.Error) {
          throw new Error(item.Error); // Lança o erro da API
        }
        return {
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
          poster: item.Poster,
        } as FilmeSerie;
      })
    );
  }

  getFavoritos(): FilmeSerie[] {
    const favoritos = localStorage.getItem(this.favoritosKey);
    return favoritos ? JSON.parse(favoritos) : [];
  }

  saveFavoritos(favoritos: FilmeSerie[]): void {
    localStorage.setItem(this.favoritosKey, JSON.stringify(favoritos));
  }

  toggleFavorito(filmeSerie: FilmeSerie): void {
    let favoritos = this.getFavoritos();
    const index = favoritos.findIndex((item) => item.titulo === filmeSerie.titulo);

    if (index === -1) {
      favoritos.push(filmeSerie);
    } else {
      favoritos.splice(index, 1);
    }

    this.saveFavoritos(favoritos);
  }

}
