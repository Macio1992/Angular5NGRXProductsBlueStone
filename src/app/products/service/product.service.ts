import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Product } from '../models/product';
import { Image } from '../models/image';

@Injectable()
export class ProductService {

    constructor(private http: HttpClient){}

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`http://localhost:3000/product`);
    }

    getProduct(id: string): Observable<Product> {
        return this.http.get<Product>(`http://localhost:3000/product/${id}`);
    }

    updateProduct(id: string, product: Product): Observable<Product>{
        return this.http.put<Product>(`http://localhost:3000/product/${id}`, product);
    }

    updateImage(id: string, image: Image): Observable<Image> {
        return this.http.put<Image>(`http://localhost:3000/image/${id}`, image);
    }

}