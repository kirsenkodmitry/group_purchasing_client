import {Injectable} from '@angular/core';
import {Product} from '../model/product';

@Injectable({providedIn: 'root'})
export class ProductService {
  getProducts(page: number): Product[] {
    let products: Product[] = [];
    for (let i = page; i < page + 9; i++) {
      const product = new Product(i.toString(), "name" + i.toString(), 30.5 + i);
      products.push(product);
    }
    return products;
  }
}
