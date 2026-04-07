import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

export interface NewProductPayload {
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  stockQuantity: number;
}

@Component({
  selector: 'app-add-product',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProductComponent {
  @Input() categories: string[] = [];
  @Output() readonly productCreated = new EventEmitter<NewProductPayload>();

  productModel: NewProductPayload = this.createEmptyProduct();

  submitProduct(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    const trimmedName = this.productModel.name.trim();

    if (trimmedName.length < 3) {
      form.controls['name']?.setErrors({
        minlength: true,
      });
      form.controls['name']?.markAsTouched();
      return;
    }

    this.productCreated.emit({
      name: trimmedName,
      price: Number(this.productModel.price),
      category: this.productModel.category,
      imageUrl: this.productModel.imageUrl.trim(),
      stockQuantity: Number(this.productModel.stockQuantity),
    });

    this.productModel = this.createEmptyProduct();
    form.resetForm(this.productModel);
  }

  private createEmptyProduct(): NewProductPayload {
    return {
      name: '',
      price: 0,
      category: '',
      imageUrl: '',
      stockQuantity: 0,
    };
  }
}
