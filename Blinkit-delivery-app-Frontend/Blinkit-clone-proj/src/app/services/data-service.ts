import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class DataService{
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    AdminLogin(username: string, password: string) {
return this.http.post(`${this.apiUrl}admin/login`,{
    userName: username,
    password: password
})

  }

  addCategory(categoryName: string, categoryDescription: string, categoryImage: string){
   return this.http.post(`${this.apiUrl}add-category`,{
    categoryName,
    categoryDescription,
    categoryImage

    });
  }

  editCategory(categoryId: string, categoryName: string, categoryDescription: string, categoryImage: string) {
        return this.http.put(`${this.apiUrl}edit-category/${categoryId}`, {
          categoryName,
            categoryDescription,
            categoryImage
        });
    }

    getCategories() {
        return this.http.get(`${this.apiUrl}categories`);
    }

    addProduct(categoryId: string, productName:string, productImage:string, productDescription:string, productPrice:number){
        return this.http.post(`${this.apiUrl}add-product`,{
            categoryId,
            productName,
            productImage,
            productDescription,
            productPrice
        });
    }

    editProduct(productId: string, productName:string,productDescription:string, productImage:string,  productPrice:number) {
          return this.http.put(`${this.apiUrl}edit-product/${productId}`, {
            productName,
            productDescription,
            productImage,
            productPrice
          });
      }

      getProductsByCategory(categoryId: string) {
        return this.http.get(`${this.apiUrl}products/${categoryId}`);
      }
    }