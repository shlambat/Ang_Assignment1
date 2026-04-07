import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stockStatus',
})
export class StockStatusPipe implements PipeTransform {
  transform(stockQuantity: number): string {
    if (stockQuantity <= 0) {
      return 'Out of Stock';
    }

    if (stockQuantity < 5) {
      return 'Few Left';
    }

    return 'In Stock';
  }
}
