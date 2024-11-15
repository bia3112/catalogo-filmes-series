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
  exibirFavoritos: boolean = false;

  toggleNavigation() {
    this.exibirFavoritos = !this.exibirFavoritos;
    this.onNavigationToggle.emit(this.exibirFavoritos);
  }
}
