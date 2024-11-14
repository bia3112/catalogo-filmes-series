import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {CatalogoService} from './catalogo.service';
import {FilmeSerie} from './filme-serie';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {

  titulo!: string;
  filmesSeries: FilmeSerie[] = []; // Lista de filmes/series retornados pela API
  error: string | null = null;

  private catalogoService = inject(CatalogoService);
  private cdRef = inject(ChangeDetectorRef); // Para forçar a detecção de mudanças

  onConsultaCatalogo() {
    if (!this.titulo) {
      this.error = 'Por favor, insira um título.';
      this.filmesSeries = [];
      return;
    }
    this.catalogoService.consultarCatalogo(this.titulo).subscribe({
      next: (response: any) => {
        console.log('Resposta da API:', response);
        if (response.Response === 'True') {
          this.filmesSeries = []; // Limpa a lista antes de adicionar novos itens
          response.Search.forEach((item: any) => {
            this.catalogoService.consultarDetalhes(item.imdbID).subscribe({
              next: (detalhes) => {
                this.filmesSeries.push(detalhes);
                this.cdRef.detectChanges(); // Força a atualização do Angular para exibir os dados
              },
              error: (error) => {
                console.log('Erro ao carregar detalhes:', error);
                this.error = 'Erro ao carregar detalhes de um ou mais itens.';
              }
            });
          });
          this.error = null;
        } else {
          this.filmesSeries = [];
          this.error = 'Nenhum filme ou série encontrado.';
        }
      },
      error: (error: any) => {
        console.log('Erro ao carregar os dados:', error);
        this.error = 'Erro ao carregar os dados. Tente novamente.';
        this.filmesSeries = [];
      }
    });
  }

}
