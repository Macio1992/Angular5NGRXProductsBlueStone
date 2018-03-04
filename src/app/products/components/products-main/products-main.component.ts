import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ProductState, getProductCollection } from '../../reducers';
import * as fromCollectionActions from '../../actions/collection';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app-products-main',
	template: `
		<h1 class="text-center">{{ title }}</h1>
		<app-product-list [products]="products$ | async"></app-product-list>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [
		`
			h1 {
				margin: 20px 0;
			}
		`
	]
})
export class ProductsMainComponent implements OnInit {

	title: string = 'Products';
	products$: Observable<any[]>;

	constructor(private store: Store<ProductState>) {
		this.products$ = store.pipe(select(getProductCollection));
	}

	ngOnInit() {
		this.store.dispatch(new fromCollectionActions.Load());
	}

}