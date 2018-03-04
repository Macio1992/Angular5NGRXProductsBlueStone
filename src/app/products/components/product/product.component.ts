import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';

@Component({
	selector: 'app-product',
	template: `
		<div class="product">
			<h5><a [routerLink]="['/products', product._id]">{{ product.name }}</a></h5>
			<p>{{ product.number }}</p>
			<p>{{ product.description }}</p>
			<div class="images container-fluid">
				<div class="row">
					<div class="image col-lg-4" *ngFor="let image of product.images">
						<img src="{{ image.url }}"/>
					</div>
				</div>
			</div>
		</div>
	`,
	styles: [
		`
			div.images {
				margin: 10px 0;
			}
			div.image img {
				width: 100%;
			}
		`
	]
})
export class ProductComponent {
	@Input() product: Product;
}