import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_shared/services/product.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {
  allProducts: any[] = []; // Store the original product data
  products: any[] = [];
  selectedProduct: any;
  filterSortForm: FormGroup;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) {
    this.filterSortForm = this.formBuilder.group({
      category: '',
      sortBy: ''
    });
  }

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.allProducts = data; // Store the original product data
      this.filterSortForm.valueChanges.subscribe((formValues) => {
        this.filterProducts(formValues);
      });

      // Initially, display all products
      this.products = [...this.allProducts];
    });
  }

  filterProducts(formValues: any) {
    let filteredProducts = [...this.allProducts]; // Use the original data for filtering

    if (formValues.category) {
      filteredProducts = filteredProducts.filter((product) =>
        product.category === formValues.category
      );
    }

    if (formValues.sortBy === 'priceAsc') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (formValues.sortBy === 'priceDesc') {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    this.products = filteredProducts;
  }

  onProductSelected(product: any) {
    this.selectedProduct = product;
  }
}
