// src/app/services/email.service.ts
import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  // Remplacez ces valeurs par vos vraies clés EmailJS
  private serviceId = 'service_hgg1bfn';
  private templateId = 'template_6azxc7n';
  private publicKey = 'h4xHQhfW92M6W6grO';

  constructor() {
    // Initialiser EmailJS avec votre clé publique
    emailjs.init(this.publicKey);
  }

  // Envoyer email de confirmation de commande
  sendOrderConfirmation(order: Order): Promise<any> {
    const templateParams = {
      to_email: order.email,
      to_name: order.username,
      order_id: order.id,
      order_date: new Date(order.date).toLocaleDateString('fr-FR'),
      order_total: order.total,
      order_status: order.status,
      order_items: this.formatOrderItems(order),
      delivery_address: order.address,
      phone: order.phone
    };

    return emailjs.send(
      this.serviceId,
      this.templateId,
      templateParams
    );
  }

  // Envoyer email quand le statut change
  sendStatusUpdate(order: Order, newStatus: string): Promise<any> {
    const statusMessages: { [key: string]: string } = {
      'Confirmée': 'Votre commande a été confirmée et est en cours de préparation.',
      'En cours de livraison': 'Votre commande est en cours de livraison.',
      'Livrée': 'Votre commande a été livrée avec succès.',
      'Annulée': 'Votre commande a été annulée.'
    };

    const templateParams = {
      to_email: order.email,
      to_name: order.username,
      order_id: order.id,
      order_status: newStatus,
      status_message: statusMessages[newStatus] || 'Le statut de votre commande a été mis à jour.',
      order_total: order.total
    };

    return emailjs.send(
      this.serviceId,
      'template_status_update', // Template différent pour les mises à jour
      templateParams
    );
  }

  // Formater les articles pour l'email
  private formatOrderItems(order: Order): string {
    return order.items.map(item => 
      `${item.productName} x${item.quantity} - ${item.price * item.quantity} TND`
    ).join('\n');
  }
}