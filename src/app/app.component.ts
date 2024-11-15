import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CatalogoComponent} from './catalogo/catalogo.component';
import {HeaderComponent} from './header/header.component';
import {FilmeSerie} from './catalogo/filme-serie';
import {CatalogoService} from './catalogo/catalogo.service';
import {ListaComponent} from './lista/lista.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CatalogoComponent, HeaderComponent, ListaComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'catalogo-filmes-series';

  exibirFavoritos: boolean = false;
  filmesSeries: FilmeSerie[] = [];

  private catalogoService = inject(CatalogoService);

  toggleExibirFavoritos(exibir: boolean) {
    this.exibirFavoritos = exibir;
    if (this.exibirFavoritos) {
      this.filmesSeries = this.catalogoService.getFavoritos();
    } else {
      this.filmesSeries = [];
    }
  }

}
