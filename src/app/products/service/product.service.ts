import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Product } from '../models/product';
import { Image } from '../models/image';

@Injectable()
export class ProductService {

    private url: string = 'http://localhost:3000';

    constructor(private http: HttpClient){}

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.url}/product`);
    }

    getProduct(id: string): Observable<Product> {
        return this.http.get<Product>(`${this.url}/product/${id}`);
    }

    updateProduct(id: string, product: Product): Observable<Product>{
        return this.http.put<Product>(`${this.url}/product/${id}`, product);
    }

    updateImage(id: string, image: Image): Observable<Image> {
        return this.http.put<Image>(`${this.url}/image/${id}`, image);
    }

}