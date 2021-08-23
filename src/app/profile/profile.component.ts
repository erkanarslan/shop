import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ShopService, Profile } from "../shop.service";

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	profile : Profile;
	formVisible = false;
	form : FormGroup;

	provinces = ["Ankara", "İzmir", "İstanbul"];
	counties = ["Çankaya", "Elmadağ", "Sincan"];

	constructor(
		private shopService : ShopService,
		private fb : FormBuilder
	) { }

	ngOnInit(): void {
		this.shopService.getProfile().subscribe(profile => this.profile = profile);

		this.form = this.fb.group({
			name : ["", Validators.required],
			phone : ["", Validators.pattern(/05\d{9}/g)],
			address : this.fb.group({
				address : ["", Validators.required],
				province : [""],
				county : [""]
			}),
			receiveSMS : [false]
		});

		this.form.get("address.province").valueChanges.subscribe(city => {
			console.log(city);
		});
	}

	edit() : void {
		this.formVisible = true;
		this.form.setValue(this.profile);
	}

	cancel() : void {
		this.formVisible = false;
	}

	save() : void {
		if(this.form.invalid) {
			return;
		}

		this.formVisible = false;
		this.profile = this.form.value;

		this.shopService.updateProfile(this.profile).subscribe();
	}

	cityChanged(city : string) {
		console.log(city);
	}
}
