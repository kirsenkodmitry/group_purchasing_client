import {Injectable, OnInit} from '@angular/core';
import {Product} from '../model/product';

@Injectable({providedIn: 'root'})
export class ProductService{
  products: Product[] = [];
  constructor() {
    this.products = this.generateProducts(1);
    console.log('ProductService initialized');
  }
  getProducts(): Product[] {
    return this.products;
  }
  generateProducts(page: number): Product[] {
    let products: Product[] = [];
    for (let i = page; i < page + 9; i++) {
      const product = new Product(i.toString(), "name" + i.toString(), 30.5 + i, i * 15, i * 10);
      products.push(product);
    }
    return products;
  }
  getProduct(id: string): Product{
    return this.products.find(p => p.id === id)!;
  }
}
