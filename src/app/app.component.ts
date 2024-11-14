import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CatalogoComponent} from './catalogo/catalogo.component';
import {HeaderComponent} from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CatalogoComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'catalogo-filmes-series';
}
