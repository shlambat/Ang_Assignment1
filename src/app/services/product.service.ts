import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Core Smartwatch V2',
      price: 299,
      category: 'Electronics',
      imageUrl: 'C:\\Angular Project\\inventory-app\\public\\asset\\watch.webp',
      stockQuantity: 42,
      isAvailable: true,
    },
    {
      id: 2,
      name: 'Sonic Mastery Headphones',
      price: 185.5,
      category: 'Audio',
      imageUrl: 'C:\\Angular Project\\inventory-app\\public\\asset\\HeadPhones.webp',
      stockQuantity: 3,
      isAvailable: true,
    },
    {
      id: 3,
      name: 'Heritage Timepiece',
      price: 450,
      category: 'Lifestyle',
      imageUrl: 'C:\\Angular Project\\inventory-app\\public\\asset\\heritage.webp',
      stockQuantity: 0,
      isAvailable: false,
    },
    {
      id: 4,
      name: 'Architectural Lamp V4',
      price: 1120,
      category: 'Furniture',
      imageUrl: 'C:\\Angular Project\\inventory-app\\public\\asset\\lamp.webp',
      stockQuantity: 12,
      isAvailable: true,
    },
    {
      id: 5,
      name: 'Ergonomic Keyboard',
      price: 129,
      category: 'Electronics',
      imageUrl: 'C:\\Angular Project\\inventory-app\\public\\asset\\Keyboard.webp',
      stockQuantity: 4,
      isAvailable: true,
    },
  ];

  getProducts(): Product[] {
    return [...this.products];
  }

  addProduct(product: Product): void {
    this.products = [...this.products, product];
  }

  removeProduct(productId: number): void {
    this.products = this.products.filter((product) => product.id !== productId);
  }

  markAsSoldOut(productId: number): void {
    this.products = this.products.map((product) => {
      if (product.id !== productId) {
        return product;
      }

      return {
        ...product,
        stockQuantity: 0,
        isAvailable: false,
      };
    });
  }
}
