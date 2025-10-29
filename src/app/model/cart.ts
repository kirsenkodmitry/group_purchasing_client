import {Product} from './product';

export class Cart {
  id: string;
  product: Product;
  amount: number;
  quantity: number;
  constructor(id: string, product: Product, amount: number, quantity: number) {
    this.id = id;
    this.product = product;
    this.amount = amount;
    this.quantity = quantity;
  }
}
