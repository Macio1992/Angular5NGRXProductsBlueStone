import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';

@Component({
	selector: 'app-product',
	template: `
		<li>
			<a [routerLink]="['/products', product._id]">{{ product.name }}</a>
			<h3>{{ product.number }}</h3>
			<h2>{{ product.description }}</h2>
		</li>
	`,
	styleUrls: ['./product.component.scss']
})
export class ProductComponent {
	@Input() product: Product;
}