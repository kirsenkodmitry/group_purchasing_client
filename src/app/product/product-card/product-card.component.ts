import {Component, Input, OnInit} from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ProductListComponent} from '../product-list/product-list.component';
import {BehaviorSubject} from 'rxjs';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, NgIf, FormsModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit{
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();
  @Input() id = '';
  @Input() name = '';
  @Input() price = 0;
  @Input() requiredReserv = 0;
  @Input() actualReserv = 0;

  radius = 40;
  circumference = 2 * Math.PI * this.radius;

  // мы используем только половину окружности
  halfCircumference = this.circumference / 2;
  showReservePart: boolean = false;
  showEditPart: boolean = false;
  qty: number = 0;
  editQtyValue: number = 0;

  constructor(private productListComponent: ProductListComponent, private appComponent: AppComponent) {
  }
  get progressPercent(): number {
    if (this.requiredReserv === 0) return 0;
    return Math.min(100, (this.actualReserv / this.requiredReserv) * 100);
  }

  get dashArray(): string {
    const filled = (this.progressPercent / 100) * this.halfCircumference;
    const empty = this.circumference;
    return `${filled} ${empty}`;
  }
  reserve(id: string): void{
    sessionStorage.setItem(id, this.qty.toString());
    this.showReservePart = false;
    this.editQtyValue = this.qty;
    this.appComponent.updateQtyProductsInCart();
    this.productListComponent.editProductOnDb(id, this.qty, 'add', 'user')
  }
  ngOnInit() {
    this.isReserved(this.id)
  }
  openReservePart(): void{
    this.showReservePart = true;
  }
  isReserved(id: string): boolean {
    if(sessionStorage.getItem(id)){
      return true;
    }else{
      return false;
    }
  }
  removeProduct(id:string): void{
    this.productListComponent.editProductOnDb(id, this.qty, 'delete', 'user')
    sessionStorage.removeItem(id);
    this.appComponent.updateQtyProductsInCart();
  }
  openEditPart(): void{
    this.showEditPart = true;
  }
  editQty(id: string, qty: number): void{
    this.productListComponent.editProductOnDb(id, qty, 'edit', 'user')
    sessionStorage.removeItem(id);
    sessionStorage.setItem(id, qty.toString());
    this.showEditPart = false;
  }
}
