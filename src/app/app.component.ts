import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'КорпЗакупка';
  qtyProductsInCart = 0;

  ngOnInit(): void {
    this.qtyProductsInCart = sessionStorage.length;
    console.log(this.qtyProductsInCart)
  }
  updateQtyProductsInCart(): void{
    this.qtyProductsInCart = sessionStorage.length;
  }
}
