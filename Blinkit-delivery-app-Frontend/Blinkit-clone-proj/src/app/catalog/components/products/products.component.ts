import { Component, OnInit } from '@angular/core';
import { CatalogDataService } from 'src/app/services/catalog-data.service';
import { CatalogHelperService } from 'src/app/services/catalog-helper.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
products: any[] = [];
  categoryName: string = '';

  cartItems: any[] = [];

  modifiedProducts: any[] = [];


  constructor( private catalogHelperService: CatalogHelperService, private catalogDataService: CatalogDataService) { }

  ngOnInit(): void {
    const selectedCategory = this.catalogHelperService.userSelectedCategory || JSON.parse(localStorage.getItem('selectedCategory') || 'null');
    if (selectedCategory) {
      this.categoryName = selectedCategory.categoryName;
      this.catalogDataService.getProductsByCategory(selectedCategory._id).subscribe((data: any) => {
        this.products = data.products;
        this.getCartItems();
      });
    }

  }

  addToCart(product: any) {
    console.log('Adding product to cart:', product);
    const userId = JSON.parse(localStorage.getItem('user') || '{}')._id;
    this.catalogDataService.addToCart(userId, product._id).subscribe((response: any) => {
      console.log('Product added to cart:', response);
      this.getCartItems();
    });
  }

  getCartItems(): void {
    const userId = JSON.parse(localStorage.getItem('user') || '{}')._id;
    this.catalogDataService.getCartItems(userId).subscribe((data: any) => {
      this.cartItems = data.cart?.itemIds || [];
      console.log('Cart items:', this.cartItems);
      this.modifyProducts();
    });
  }

  modifyProducts(): void {
    this.modifiedProducts = [];
    this.products.forEach(product => {
      const cartItem = this.cartItems.find(cartItem => cartItem.productId === product._id);
      if (cartItem) {
        const modifiedProduct = {...product, quantity: cartItem.quantity};
        this.modifiedProducts.push(modifiedProduct);
      } else {
        this.modifiedProducts.push({ ...product, quantity: 0 });
      }
    });

}
 increaseQuantity(product: any): void {
    this.addToCart(product);
  }

  decreaseQuantity(product: any): void {
    const userId=JSON.parse(localStorage.getItem('user') || '{}')._id;
    this.catalogDataService.removeFromCart(userId, product._id).subscribe((response: any) => {
      console.log('Product quantity decreased:', response);
      this.getCartItems();
    });
  }

}
