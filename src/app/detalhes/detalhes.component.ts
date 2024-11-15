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

  constructor(private catalogoService: CatalogoService) {}

  ngOnInit(): void {
    this.favoritos = this.catalogoService.getFavoritos(); // Carrega os favoritos
  }

  // Método para adicionar/remover de favoritos
  toggleFavorito(filmeSerie: FilmeSerie) {
    this.catalogoService.toggleFavorito(filmeSerie);
    this.favoritos = this.catalogoService.getFavoritos(); // Atualiza a lista de favoritos
  }

  // Método para verificar se o item é favorito
  isFavorito(filmeSerie: FilmeSerie): boolean {
    return this.favoritos.some((fav) => fav.titulo === filmeSerie.titulo);
  }

}
