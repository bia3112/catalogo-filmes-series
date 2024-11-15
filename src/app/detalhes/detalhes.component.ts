import {Component, Input} from '@angular/core';
import {FilmeSerie} from '../catalogo/filme-serie';
import {CatalogoService} from '../catalogo/catalogo.service';

@Component({
  selector: 'app-detalhes',
  standalone: true,
  imports: [],
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.css'
})
export class DetalhesComponent {
  @Input() filmeSerie!: FilmeSerie;

  favoritos: FilmeSerie[] = [];

  ngOnInit() {
    this.favoritos = this.catalogoService.getFavoritos();
  }

  constructor(private catalogoService: CatalogoService) {}

  toggleFavorito(filmeSerie: FilmeSerie) {
    this.catalogoService.toggleFavorito(filmeSerie);
    this.favoritos = this.catalogoService.getFavoritos();
  }

  isFavorito(filmeSerie: FilmeSerie): boolean {
    return this.favoritos.some((fav) => fav.titulo === filmeSerie.titulo);
  }

}
