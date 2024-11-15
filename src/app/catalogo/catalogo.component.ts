import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {CatalogoService} from './catalogo.service';
import {FilmeSerie} from './filme-serie';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ListaComponent} from '../lista/lista.component';
import {CardComponent} from '../card/card.component';
import {DetalhesComponent} from '../detalhes/detalhes.component';
import {HeaderComponent} from '../header/header.component';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [FormsModule, CommonModule, ListaComponent, CardComponent, DetalhesComponent, HeaderComponent],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {

  titulo!: string;
  filmesSeries: FilmeSerie[] = []; // Lista de filmes/series retornados pela API
  error: string | null = null;
  exibirFavoritos: boolean = false; // Controla a exibição dos favoritos

  private catalogoService = inject(CatalogoService);

  onConsultaCatalogo() {
    if (!this.titulo) {
      this.error = 'Por favor, insira um título.';
      this.filmesSeries = [];
      return;
    }
    this.catalogoService.consultarCatalogo(this.titulo).subscribe({
      next: (response: any) => {
        if (response.Response === 'True') {
          this.filmesSeries = [];
          response.Search.forEach((item: any) => {
            this.catalogoService.consultarDetalhes(item.imdbID).subscribe({
              next: (detalhes) => {
                this.filmesSeries.push(detalhes);
              },
              error: () => {
                this.error = 'Erro ao carregar detalhes de um ou mais itens.';
              },
            });
          });
          this.error = null;
        } else {
          this.filmesSeries = [];
          this.error = 'Nenhum filme ou série encontrado.';
        }
      },
      error: () => {
        this.error = 'Erro ao carregar os dados. Tente novamente.';
        this.filmesSeries = [];
      },
    });
  }

  // Método para alternar entre exibir catálogo e favoritos
  toggleExibirFavoritos(exibir: boolean) {
    this.exibirFavoritos = exibir;
    if (this.exibirFavoritos) {
      this.filmesSeries = this.catalogoService.getFavoritos();
    } else {
      this.filmesSeries = [];
    }
  }

}
