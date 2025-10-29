import {Component, OnInit} from '@angular/core';
import {ProductService} from '../service/product.service';
import {Cart} from '../model/cart';
import {CommonModule} from '@angular/common';
import {Product} from '../model/product';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  products: Cart[] = [];
  storageItems: { key: string; value: string }[] = [];
  constructor(private productService: ProductService) {
    this.storageItems = Object.keys(sessionStorage).map(key => ({
      key: key,
      value: sessionStorage.getItem(key) || '',
    }));
  }
  ngOnInit(): void {
    this.initProducts();
  }
  initProducts(): void{

    for (const item of this.storageItems) {
      const product = this.productService.getProduct(item.key);
      if (product) {
        const cartEntry = new Cart(product.id, product, product.price * +item.value, +item.value)
        this.products.push(cartEntry);
      }
    }
  }
  increaseQuantity(product: any) {
    product.quantity++;
    this.updateAmount(product);
  }

  decreaseQuantity(product: any) {
    if (product.quantity > 1) {
      product.quantity--;
      this.updateAmount(product);
    }
  }

  removeProduct(product: any) {
    this.products = this.products.filter(p => p !== product);
  }

  updateAmount(product: any) {
    const pricePerItem = product.amount / (product.quantity - 1 || 1);
    product.amount = pricePerItem * product.quantity;
  }

  getTotal() {
    return this.products.reduce((sum, item) => sum + item.amount, 0);
  }

  checkout() {
    alert('Спасибо за заказ!');
  }

}
