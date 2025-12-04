// src/app/components/home/home.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  categories = [
    { name: 'Stylos', icon: 'bi-pen', route: '/products', category: 'stylos' },
    { name: 'Cahiers', icon: 'bi-journal', route: '/products', category: 'cahiers' },
    { name: 'Livres', icon: 'bi-book', route: '/products', category: 'livres' },
    { name: 'Fournitures', icon: 'bi-scissors', route: '/products', category: 'fournitures' }
  ];
}