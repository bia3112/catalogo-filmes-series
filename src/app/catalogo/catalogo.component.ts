import {Component, inject} from '@angular/core';
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
  filmeSerie: FilmeSerie | null = null;
  error: string | null = null;
  private catalogoService = inject(CatalogoService);

  onConsultaCatalogo() {
    if (!this.titulo) {
      this.error = 'Por favor, insira um título.';
      return;
    }

    this.catalogoService.consultarCatalogo(this.titulo).subscribe({
      next: (filmeSerie: FilmeSerie) => {
        console.log(filmeSerie);
        this.filmeSerie = filmeSerie;
        this.error = null; // Limpa erros anteriores
      },
      error: (error: any) => {
        console.log(error);
        this.error = 'Não foi possível carregar os dados do filme/série.';
        this.filmeSerie = null; // Limpa dados anteriores
      }
    });
  }


}
