import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddProductComponent, NewProductPayload } from '../add-product/add-product';
import { Product } from '../models/product';
import { ProductCardComponent } from '../product-card/product-card';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule, ProductCardComponent, AddProductComponent],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  searchTerm = '';

  private readonly baseCategories: string[] = [
    'Electronics',
    'Audio',
    'Lifestyle',
    'Furniture',
    'Accessories',
  ];

  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  get filteredProducts(): Product[] {
    const normalizedTerm = this.searchTerm.trim().toLowerCase();

    if (!normalizedTerm) {
      return this.products;
    }

    return this.products.filter((product) =>
      product.name.toLowerCase().includes(normalizedTerm)
    );
  }

  get totalValuation(): number {
    return this.products.reduce((sum, product) => {
      return sum + product.price * product.stockQuantity;
    }, 0);
  }

  get activeSkus(): number {
    return this.products.filter((product) => product.isAvailable).length;
  }

  get stockTurnover(): string {
    if (this.products.length === 0) {
      return '0.0x';
    }

    const weightedAvailability = this.products.reduce((score, product) => {
      return score + (product.isAvailable ? 1 : 0.25);
    }, 0);

    return `${((weightedAvailability / this.products.length) * 4).toFixed(1)}x`;
  }

  get categories(): string[] {
    const categorySet = new Set<string>([
      ...this.baseCategories,
      ...this.products.map((product) => product.category),
    ]);

    return Array.from(categorySet).sort();
  }

  onProductCreated(payload: NewProductPayload): void {
    const newProduct: Product = {
      id: this.getNextProductId(),
      name: payload.name,
      price: payload.price,
      category: payload.category,
      imageUrl: payload.imageUrl,
      stockQuantity: payload.stockQuantity,
      isAvailable: payload.stockQuantity > 0,
    };

    this.productService.addProduct(newProduct);
    this.products = this.productService.getProducts();
  }

  onDeleteProduct(productId: number): void {
    this.productService.removeProduct(productId);
    this.products = this.productService.getProducts();
  }

  onMarkSoldOut(productId: number): void {
    this.productService.markAsSoldOut(productId);
    this.products = this.productService.getProducts();
  }

  trackByProductId(_index: number, product: Product): number {
    return product.id;
  }

  private getNextProductId(): number {
    if (this.products.length === 0) {
      return 1;
    }

    return Math.max(...this.products.map((product) => product.id)) + 1;
  }
}
