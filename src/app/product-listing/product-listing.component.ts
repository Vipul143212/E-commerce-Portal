import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_shared/services/product.service';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {
  products!: any[];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }
  addToCart(product: any) {
    //this.cartService.addToCart(product);
    // You can add a message or notification here if needed
  }
}