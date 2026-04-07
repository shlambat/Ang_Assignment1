import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Product } from '../models/product';
import { StockStatusPipe } from '../pipes/stock-status.pipe';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, StockStatusPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCardComponent implements OnDestroy {
  readonly fallbackImageUrl = '/product-placeholder.svg';

  @Input({ required: true }) product: Product = {
    id: 0,
    name: '',
    price: 0,
    category: '',
    imageUrl: '',
    stockQuantity: 0,
    isAvailable: false,
  };

  @Output() readonly deleteItem = new EventEmitter<number>();
  @Output() readonly markSoldOut = new EventEmitter<number>();

  get stockProgress(): number {
    const maxReferenceStock = 50;
    return Math.min(100, Math.max(0, (this.product.stockQuantity / maxReferenceStock) * 100));
  }

  requestDelete(): void {
    this.deleteItem.emit(this.product.id);
  }

  requestMarkSoldOut(): void {
    this.markSoldOut.emit(this.product.id);
  }

  resolveImageUrl(imageUrl?: string): string {
    const trimmedImageUrl = imageUrl?.trim();
    if (!trimmedImageUrl) {
      return this.fallbackImageUrl;
    }

    const normalizedPath = trimmedImageUrl.replace(/\\/g, '/');
    const publicMarker = '/public/';
    const publicPathIndex = normalizedPath.toLowerCase().indexOf(publicMarker);

    if (publicPathIndex >= 0) {
      return normalizedPath.slice(publicPathIndex + '/public'.length);
    }

    return normalizedPath;
  }

  onImageError(event: Event): void {
    const imageElement = event.target as HTMLImageElement | null;
    if (!imageElement || imageElement.src.includes(this.fallbackImageUrl)) {
      return;
    }

    imageElement.src = this.fallbackImageUrl;
  }

  ngOnDestroy(): void {
    console.log(`Product removed from DOM: ${this.product.name}`);
  }
}
