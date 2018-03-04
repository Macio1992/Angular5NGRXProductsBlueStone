import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { State, getSelectedProduct, getSelectedProductId } from '../../reducers';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import * as fromActions from '../../actions/product';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../models/product';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { startWith } from 'rxjs/operators';

@Component({
	selector: 'app-product-single',
	template: `
		<ul class="nav nav-pills">
			<li class="nav-item">
				<a class="nav-link" routerLink="/products">Home</a>
			</li>
		</ul>

		<app-product *ngIf="!showForm" [product]="product$ | async"></app-product>

		<div *ngIf="showForm" class="update-form row">
			<div class="col-lg-6">
			<h1>Products</h1>
			<form *ngIf="product$ | async" [formGroup] = "updateForm" (ngSubmit)="update(updateForm.value)">
				<div class="form-group">
					<label for="name" placeholder="Name">Name:</label>
					<input class="form-control" type="text" id="name" formControlName="name">
				</div>
				<div class="form-group">
					<label for="number">Number:</label>
					<input class="form-control" type="text" id="number" placeholder="Number" formControlName="number">
				</div>
				<div class="form-group">
					<label for="description">Description:</label>
					<input class="form-control" type="text" id="description" formControlName="description">
				</div>
				
				<button class="btn btn-primary">Save</button>
				<button class="btn btn-outline-primary" (click)="showForm = !showForm">Cancel</button>
			</form>
			</div>
		
			<div class="col-lg-6">
			<h1>Images</h1>
			<form [formGroup] = "updateForm">
				<div formArrayName="images" *ngFor="let item of updateForm.get('images').controls; let i = index;">
					<div [formGroupName]="i">
						<div class="form-group">
							<label>Url: </label>
							<input class="form-control" type="text" formControlName="url">
						</div>
						<div class="form-group">
							<label>Name: </label>
							<input class="form-control" type="text" formControlName="name">
						</div>
						<div class="form-group">
							<button (click)="updateImage(item.value, updateForm.get('images').value)" class="btn btn-primary">Save</button>
						</div>
					</div>
				</div>
			</form>
			</div>
		</div>

		<button class="btn btn-info" *ngIf="!showForm" (click)="showForm = !showForm">update</button>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ['./product-single.component.scss']
})
export class ProductSingleComponent implements OnDestroy {

	actionsSubscription: Subscription;
	productSubscription: Subscription;
	product$: Observable<Product>;
	updateForm: FormGroup;
	showForm: boolean = false;

	constructor(private store: Store<State>, route: ActivatedRoute, private fb: FormBuilder, private router: Router) {
		
		this.actionsSubscription = route.params
		.pipe(map(params => new fromActions.Select(params.id)))
		.subscribe(store);

		this.product$ = store.select(getSelectedProduct);

		this.updateForm = fb.group({
			name: '',
			number: '',
			description: '',
			images: fb.array([])
		});

		this.productSubscription = store.select(getSelectedProduct).subscribe(
			product => {
				if(product){
					this.updateForm.get('name').patchValue(product.name);
					this.updateForm.get('number').patchValue(product.number);
					this.updateForm.get('description').patchValue(product.description);
					product.images.forEach(i => {
						this.addItem(i._id, i.url, i.name);
					})
				} else this.router.navigate(['/products']);
			}
		);
	}

	createItem(id: string, url: string, name: string){
		return this.fb.group({
			_id: id,
			url: url,
			name: name
		})
	}

	addItem(id: string, url: string, name: string){
		let items = this.updateForm.get('images') as FormArray;
		items.push(this.createItem(id, url, name));
	}

	update(form){
		this.productSubscription = this.store.select(getSelectedProductId).subscribe(
			id => this.store.dispatch(new fromActions.Update({id: id, product:form}))
		);
		this.router.navigate(['/products']);
	}

	updateImage(form, images){
		this.store.dispatch(new fromActions.UpdateImageAction({
			id: form._id,
			images: images,
			image: form
		}));
	}

	ngOnDestroy() {
		this.actionsSubscription.unsubscribe();
		this.productSubscription.unsubscribe();
	}

}