export class Product {
  id: string;
  name: string;
  price: number;
  requiredReserv: number;
  actualReserv: number;
  constructor(id: string, name: string, price: number, requiredReserv: number, actualReserv: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.requiredReserv = requiredReserv;
    this.actualReserv = actualReserv;
  }
}
