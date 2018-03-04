import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app-product-list',
	template: `
		<ul><app-product *ngFor="let product of products" [product]="product"></app-product></ul>
	`,
	styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
	@Input() products: Product[];
}
