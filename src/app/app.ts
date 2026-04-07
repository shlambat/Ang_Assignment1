import { Component } from '@angular/core';
import { HeaderComponent } from './header/header';
import { ProductListComponent } from './product-list/product-list';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, ProductListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
