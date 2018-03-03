import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ProductState, getProductCollection } from '../../reducers';
import * as fromCollectionActions from '../../actions/collection';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app-products-main',
	templateUrl: './products-main.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ['./products-main.component.scss']
})
export class ProductsMainComponent implements OnInit {

	products$: Observable<any[]>;

	constructor(private store: Store<ProductState>) {
		this.products$ = store.pipe(select(getProductCollection));
	}

	ngOnInit() {
		this.store.dispatch(new fromCollectionActions.Load());
	}

}