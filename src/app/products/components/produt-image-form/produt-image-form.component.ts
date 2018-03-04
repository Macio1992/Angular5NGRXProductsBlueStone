import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'app-produt-image-form',
	template: `
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
						<button (click)="updateImage.emit({form: item.value, images: updateForm.get('images').value})" class="btn btn-primary">Save</button>
					</div>
				</div>
			</div>
		</form>
	`
})
export class ProdutImageFormComponent {
	@Input() updateForm: FormGroup;
	@Output() updateImage = new EventEmitter<any>();
}
