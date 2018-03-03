import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../models/product';
import { Store } from '@ngrx/store';
import { ProductState, getSelectedProduct, State, getSelectedProductId } from '../../reducers';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as fromActions from '../../actions/product';
import { Router } from '@angular/router';

@Component({
	selector: 'app-selected-product',
	templateUrl: './selected-product.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ['./selected-product.component.scss']
})
export class SelectedProductComponent implements OnInit {

	product$: Observable<Product>;
	updateForm: FormGroup;

	constructor(private store: Store<State>, private fb: FormBuilder, private router: Router) {
		this.product$ = store.select(getSelectedProduct);
		
		this.updateForm = fb.group({
			name: '',
			number: '',
			description: ''
		});
	}

	ngOnInit() {
	}

	update(form){
		this.store.select(getSelectedProductId).subscribe(
			id => this.store.dispatch(new fromActions.Update({id: id, product:form}))
		);
		this.router.navigate(['/products']);
	}
}