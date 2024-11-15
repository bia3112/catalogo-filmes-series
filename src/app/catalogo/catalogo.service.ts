import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {FilmeSerie} from './filme-serie';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  private httpClient = inject(HttpClient);
  private favoritosKey = 'favoritos'; // Chave usada no localStorage

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

  // Recuperar favoritos do localStorage
  getFavoritos(): FilmeSerie[] {
    const favoritos = localStorage.getItem(this.favoritosKey);
    return favoritos ? JSON.parse(favoritos) : [];
  }

  // Salvar favoritos no localStorage
  saveFavoritos(favoritos: FilmeSerie[]): void {
    localStorage.setItem(this.favoritosKey, JSON.stringify(favoritos));
  }

  // Adicionar ou remover de favoritos
  toggleFavorito(filmeSerie: FilmeSerie): void {
    let favoritos = this.getFavoritos();
    const index = favoritos.findIndex(item => item.titulo === filmeSerie.titulo); // Usando 'titulo' como identificador

    if (index === -1) {
      // Adiciona aos favoritos se não estiver
      favoritos.push(filmeSerie);
    } else {
      // Remove dos favoritos se já estiver
      favoritos.splice(index, 1);
    }

    // Salva a lista atualizada de favoritos
    this.saveFavoritos(favoritos);
  }


}
