// src/app/components/checkout/checkout.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { Order, OrderItem } from '../../models/order.model';
import { CartItem } from '../../models/cart-item.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  cartItems: CartItem[] = [];
  total: number = 0;
  currentUser: User | null = null;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.getTotal();

    if (this.cartItems.length === 0) {
      this.router.navigate(['/cart']);
    }

    this.initForm();
  }

  initForm(): void {
    this.checkoutForm = this.fb.group({
      username: [this.currentUser?.username || '', [Validators.required, Validators.minLength(3)]],
      email: [this.currentUser?.email || '', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{8,}$/)]],
      address: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.checkoutForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      const orderItems: OrderItem[] = this.cartItems.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price
      }));

      const order: Order = {
        userId: this.currentUser?.id || 0,
        username: this.checkoutForm.value.username,
        email: this.checkoutForm.value.email,
        phone: this.checkoutForm.value.phone,
        address: this.checkoutForm.value.address,
        items: orderItems,
        total: this.total,
        date: new Date().toISOString(),
        status: 'En attente'
      };

      this.orderService.createOrder(order).subscribe({
        next: (response) => {
          console.log('Commande créée avec succès:', response);
          this.cartService.clearCart();
          alert('Votre commande a été passée avec succès !');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Erreur lors de la création de la commande:', err);
          alert('Une erreur est survenue. Veuillez réessayer.');
          this.isSubmitting = false;
        }
      });
    }
  }

  get f() {
    return this.checkoutForm.controls;
  }
}