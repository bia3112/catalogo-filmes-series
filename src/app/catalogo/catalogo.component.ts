import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {CatalogoService} from './catalogo.service';
import {FilmeSerie} from './filme-serie';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [
    FormsModule, CommonModule
  ],
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
      this.filmesSeries = []; // Limpa os resultados anteriores
      return;
    }

    this.catalogoService.consultarCatalogo(this.titulo).subscribe({
      next: (response: any) => {
        console.log('Resposta da API:', response); // Verifica o que a API está retornando
        if (response.Response === 'True') {
          this.filmesSeries = response.Search; // Armazena a lista de filmes/series
          this.error = null; // Limpa erros anteriores
        } else {
          this.filmesSeries = []; // Limpa a lista caso não haja filmes
          this.error = 'Nenhum filme ou série encontrado.';
        }
      },
      error: (error: any) => {
        console.log(error); // Verifica o erro se ocorrer
        this.error = 'Erro ao carregar os dados. Tente novamente.';
        this.filmesSeries = []; // Limpa resultados anteriores
      }
    });
  }

}
