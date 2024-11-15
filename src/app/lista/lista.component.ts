import {Component, Input} from '@angular/core';
import {FilmeSerie} from '../catalogo/filme-serie';
import {CardComponent} from '../card/card.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [
    CardComponent,
    NgForOf
  ],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
  @Input() filmesSeries: FilmeSerie[] = [];
}
