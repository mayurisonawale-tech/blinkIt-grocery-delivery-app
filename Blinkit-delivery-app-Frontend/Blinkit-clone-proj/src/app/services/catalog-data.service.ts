import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class CatalogDataService {
    private apiUrl = 'http://localhost:3000/';

    constructor(private http: HttpClient) {}

    getCategories(): Observable<any> {
        return this.http.get(`${this.apiUrl}categories`);
    }

    getProductsByCategory(categoryId: string): Observable<any> {
        return this.http.get(`${this.apiUrl}products/${categoryId}`);
    }

    addToCart(userId: string, productId: string): Observable<any> {
        return this.http.post(`${this.apiUrl}add-to-cart`, {
            userId, 
            productId });
    }

      removeFromCart(userId: string, productId: string): Observable<any> {
        return this.http.put(`${this.apiUrl}remove-from-cart`, { userId, productId });
    }

    getCartItems(userId: string): Observable<any> {
        return this.http.get(`${this.apiUrl}cart-items/${userId}`);
    }
getPopulatedCartItems(userId: string): Observable<any> {
        return this.http.get(`${this.apiUrl}populated-cart-items/${userId}`);
    }

}