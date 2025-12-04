// src/app/components/admin/admin-dashboard/admin-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../models/order.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  isLoading: boolean = true;
  searchTerm: string = '';

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading = true;
    this.orderService.getAllOrders().subscribe({
      next: (data) => {
        this.orders = data.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        this.filteredOrders = this.orders;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des commandes:', err);
        this.isLoading = false;
      }
    });
  }

  onSearchChange(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredOrders = this.orders.filter(order => 
      order.username.toLowerCase().includes(term) ||
      order.email.toLowerCase().includes(term) ||
      order.id?.toString().includes(term)
    );
  }

  getTotalRevenue(): number {
    return this.orders.reduce((sum, order) => sum + order.total, 0);
  }

  getOrderCount(): number {
    return this.orders.length;
  }

  // Recharger les commandes après une mise à jour
  onOrderUpdated(): void {
    this.loadOrders();
  }
}