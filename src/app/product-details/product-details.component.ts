import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../_shared/services/product.service'; // Import your product service

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId!: number;
  product: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
      this.route.paramMap.subscribe((params) => {
        this.productId = +params.get('id')!;
        this.loadProductDetails();
    });
    
  }

  loadProductDetails() {
    this.productService.getProductById(this.productId).subscribe((data) => {
      this.product = data;
    });
  }
  goToProductList() {
    this.router.navigate(['/']); 
  }

  addToCart(product: any) {
    // Implement your cart functionality here
  }
}