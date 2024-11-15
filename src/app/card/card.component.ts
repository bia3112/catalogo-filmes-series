import {Component, Input} from '@angular/core';
import {FilmeSerie} from '../catalogo/filme-serie';
import {DetalhesComponent} from '../detalhes/detalhes.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    DetalhesComponent
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() filmeSerie!: FilmeSerie;
}
