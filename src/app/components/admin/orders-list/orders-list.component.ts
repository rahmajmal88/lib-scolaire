// src/app/components/admin/orders-list/orders-list.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Order } from '../../../models/order.model';
import { OrderService } from '../../../services/order.service';
import { EmailService } from '../../../services/email.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent {
  @Input() orders: Order[] = [];
  @Output() orderUpdated = new EventEmitter<void>(); // ← CETTE LIGNE EST IMPORTANTE

  isUpdatingStatus: { [key: number]: boolean } = {};
  isSendingEmail: { [key: number]: boolean } = {};

  availableStatuses = [
    'En attente',
    'Confirmée',
    'En cours de préparation',
    'En cours de livraison',
    'Livrée',
    'Annulée'
  ];

  constructor(
    private orderService: OrderService,
    private emailService: EmailService
  ) {}

  getStatusBadgeClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'en attente':
        return 'bg-warning';
      case 'confirmée':
        return 'bg-info';
      case 'en cours de préparation':
        return 'bg-primary';
      case 'en cours de livraison':
        return 'bg-secondary';
      case 'livrée':
        return 'bg-success';
      case 'annulée':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Changer le statut d'une commande
  changeOrderStatus(order: Order, newStatus: string): void {
    if (!order.id) return;

    if (confirm(`Voulez-vous changer le statut de la commande #${order.id} en "${newStatus}" ?`)) {
      this.isUpdatingStatus[order.id] = true;

      this.orderService.updateOrderStatus(order.id, newStatus).subscribe({
        next: (updatedOrder) => {
          console.log('Statut mis à jour:', updatedOrder);
          order.status = newStatus;
          this.isUpdatingStatus[order.id!] = false;
          this.orderUpdated.emit(); // ← Émettre l'événement
          alert(`Statut changé en "${newStatus}" avec succès !`);
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour du statut:', err);
          this.isUpdatingStatus[order.id!] = false;
          alert('Erreur lors de la mise à jour du statut.');
        }
      });
    }
  }

  // Envoyer un email de confirmation
  sendConfirmationEmail(order: Order): void {
    const orderId = order.id;
    if (orderId == null) return;

    if (confirm(`Envoyer un email de confirmation à ${order.email} ?`)) {
      this.isSendingEmail[orderId] = true;

      this.emailService.sendOrderConfirmation(order).then(
        (response) => {
          console.log('Email envoyé avec succès:', response);
          this.isSendingEmail[orderId] = false;
          alert(`Email envoyé à ${order.email} avec succès !`);
        },
        (error) => {
          console.error('Erreur lors de l\'envoi de l\'email:', error);
          this.isSendingEmail[orderId] = false;
          alert('Erreur lors de l\'envoi de l\'email. Vérifiez la configuration EmailJS.');
        }
      );
    }
  }

  // Confirmer la commande ET envoyer l'email
  confirmOrderAndSendEmail(order: Order): void {
    if (!order.id) return;

    if (confirm(`Confirmer la commande #${order.id} et envoyer un email à ${order.email} ?`)) {
      this.isUpdatingStatus[order.id] = true;

      // 1. Mettre à jour le statut
      this.orderService.updateOrderStatus(order.id, 'Confirmée').subscribe({
        next: (updatedOrder) => {
          order.status = 'Confirmée';
          console.log('Commande confirmée:', updatedOrder);

          // 2. Envoyer l'email
          this.emailService.sendOrderConfirmation(order).then(
            (response) => {
              console.log('Email envoyé:', response);
              this.isUpdatingStatus[order.id!] = false;
              this.orderUpdated.emit(); // ← Émettre l'événement
              alert(`Commande confirmée et email envoyé à ${order.email} !`);
            },
            (error) => {
              console.error('Erreur email:', error);
              this.isUpdatingStatus[order.id!] = false;
              alert('Commande confirmée mais erreur lors de l\'envoi de l\'email.');
            }
          );
        },
        error: (err) => {
          console.error('Erreur:', err);
          this.isUpdatingStatus[order.id!] = false;
          alert('Erreur lors de la confirmation de la commande.');
        }
      });
    }
  }

  // Supprimer une commande
  deleteOrder(orderId: number): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer la commande #${orderId} ?`)) {
      this.orderService.deleteOrder(orderId).subscribe({
        next: () => {
          alert('Commande supprimée avec succès !');
          this.orderUpdated.emit(); // ← Émettre l'événement
        },
        error: (err) => {
          console.error('Erreur lors de la suppression:', err);
          alert('Erreur lors de la suppression de la commande.');
        }
      });
    }
  }
}