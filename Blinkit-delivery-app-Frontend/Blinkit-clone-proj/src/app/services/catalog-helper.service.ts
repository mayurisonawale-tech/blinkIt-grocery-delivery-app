
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class CatalogHelperService {

    userSelectedCategory: any;

    constructor() { }

    clearSelectedCategory():void {
        this.userSelectedCategory = null;
        localStorage.removeItem('selectedCategory');
    }


}