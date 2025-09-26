import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() id = '';
  @Input() name = '';
  @Input() price = 0;
  @Input() requiredReserv = 0;
  @Input() actualReserv = 0;

  radius = 40;
  circumference = 2 * Math.PI * this.radius;

  // мы используем только половину окружности
  halfCircumference = this.circumference / 2;

  get progressPercent(): number {
    if (this.requiredReserv === 0) return 0;
    return Math.min(100, (this.actualReserv / this.requiredReserv) * 100);
  }

  get dashArray(): string {
    const filled = (this.progressPercent / 100) * this.halfCircumference;
    const empty = this.circumference;
    return `${filled} ${empty}`;
  }
}
