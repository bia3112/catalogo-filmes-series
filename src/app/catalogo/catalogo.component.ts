import {Component, inject} from '@angular/core';
import {CatalogoService} from './catalogo.service';
import {FilmeSerie} from './filme-serie';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {

  private titulo!: string;
  private catalogoService = inject(CatalogoService);

  onConsultaCatalogo() {
    this.titulo = 'Guardians of the Galaxy Vol. 2';
    this.catalogoService.consultarCatalogo(this.titulo).subscribe(
      {
        next: (filmeSerie: FilmeSerie) => {
          console.log(filmeSerie);
        },
          error: (error: any) => {
            console.log(error);
          }
      }
    )
  }
}
