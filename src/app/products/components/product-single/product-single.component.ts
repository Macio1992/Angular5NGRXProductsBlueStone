import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { State, getSelectedProduct, getSelectedProductId } from '../../reducers';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import * as fromActions from '../../actions/product';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../models/product';
import { FormGroup, FormBuilder } from '@angular/forms';
import { startWith } from 'rxjs/operators';

@Component({
	selector: 'app-product-single',
	template: `
		<a routerLink="/products">Home</a>

		<form *ngIf="product$ | async" [formGroup] = "updateForm" (ngSubmit)="update(updateForm.value)">
			<label>Name:</label>
			<input type="text" formControlName="name">
			<label>Number:</label>
			<input type="text" formControlName="number">
			<label>Description:</label>
			<input type="text" formControlName="description">
			<input type="submit" value="Update">
		</form>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ['./product-single.component.scss']
})
export class ProductSingleComponent implements OnDestroy {

	actionsSubscription: Subscription;
	productSubscription: Subscription;
	product$: Observable<Product>;
	updateForm: FormGroup;

	constructor(private store: Store<State>, route: ActivatedRoute, private fb: FormBuilder, private router: Router) {
		
		this.actionsSubscription = route.params
		.pipe(map(params => new fromActions.Select(params.id)))
		.subscribe(store);

		this.product$ = store.select(getSelectedProduct);

		this.updateForm = fb.group({
			name: '',
			number: '',
			description: ''
		});

		this.productSubscription = store.select(getSelectedProduct).subscribe(
			product => {
				this.updateForm.get('name').patchValue(product.name);
				this.updateForm.get('number').patchValue(product.number);
				this.updateForm.get('description').patchValue(product.description);
			}
		);
		
	}

	update(form){
		this.productSubscription = this.store.select(getSelectedProductId).subscribe(
			id => this.store.dispatch(new fromActions.Update({id: id, product:form}))
		);
		this.router.navigate(['/products']);
	}

	ngOnDestroy() {
		this.actionsSubscription.unsubscribe();
		this.productSubscription.unsubscribe();
	}

}