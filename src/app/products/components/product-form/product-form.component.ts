import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'app-product-form',
	template: `
	<form *ngIf="product" [formGroup] = "updateForm" (ngSubmit)="update.emit(updateForm.value)">
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
	`
})
export class ProductFormComponent implements OnInit {

	@Input() product: Product;
	@Input() updateForm: FormGroup;
	@Output() update = new EventEmitter<any>();

	constructor() { }

	ngOnInit() {
	}

}
