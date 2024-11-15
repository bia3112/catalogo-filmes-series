import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() onNavigationToggle = new EventEmitter<boolean>();
  private exibirFavoritos: boolean = false;

  toggleFavoritos(event: Event) {
    event.preventDefault();
    this.exibirFavoritos = !this.exibirFavoritos;
    this.onNavigationToggle.emit(this.exibirFavoritos);
  }

  exibirInicio(event: Event) {
    event.preventDefault();
    this.exibirFavoritos = false;
    this.onNavigationToggle.emit(this.exibirFavoritos);
  }

}
