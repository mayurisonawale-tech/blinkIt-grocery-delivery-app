import { Component, OnInit } from '@angular/core';
import { AnyForUntypedForms } from '@angular/forms';
import { CatalogDataService } from 'src/app/services/catalog-data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private catalogDataService:CatalogDataService) { }

 populatedCartItems :any[]=[];
 totalPrice:number=0


  ngOnInit(): void {
    this.getCartItems();
  }

 addToCart(product: any): void {
    const userId = JSON.parse(localStorage.getItem('user') || '{}')._id;
    this.catalogDataService.addToCart(userId, product._id).subscribe((response: any) => {
      console.log('Product added to cart:', response);
      this.getCartItems();
    });
  }

  getCartItems():void{
    const userId = JSON.parse(localStorage.getItem('user') || '{}')._id;
    this.catalogDataService.getPopulatedCartItems(userId).subscribe((data: any) => {
      this.populatedCartItems = data.cart.items;
      this.totalPrice = data.cart.totalPrice;
      console.log('Populated cart items:', this.populatedCartItems);
      console.log('Total price:', this.totalPrice);
    });
  }

   increaseQuantity(product: any): void {
    this.addToCart(product);
  }

  decreaseQuantity(product: any): void {
    const userId = JSON.parse(localStorage.getItem('user') || '{}')._id;
    this.catalogDataService.removeFromCart(userId, product._id).subscribe((response: any) => {
      console.log('Product quantity decreased:', response);
      this.getCartItems();
    });
  }

  checkout(): void {
    console.log('Proceeding to checkout');
  }

}
