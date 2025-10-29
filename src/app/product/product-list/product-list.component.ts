import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/product';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute} from '@angular/router';
import {ProductCardComponent} from '../product-card/product-card.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent  implements OnInit{
  products: Product[] = [];
  page: number = 1;
  constructor(private productService: ProductService, private route: ActivatedRoute) {
    // this.route.queryParamMap.subscribe(params => {
    //   this.page = +params.get('page');
    // });
  }
  ngOnInit() {
    this.products = this.productService.getProducts();
    console.log(this.products);
  }
  editProductOnDb(id: string, qty: number, action: string,  user: string): void{
    const product = this.products.find(p => p.id === id)!;
    if(action === 'add'){
      product.actualReserv = product.actualReserv + qty;
    }else{
      if(action === 'edit'){
        product.actualReserv = product.actualReserv - (+sessionStorage.getItem(id)!) + qty;
      }else{
        product.actualReserv = product.actualReserv - +sessionStorage.getItem(id)!;
      }
    }
  }
}
