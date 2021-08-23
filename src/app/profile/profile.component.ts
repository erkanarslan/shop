import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";

import { ShopService, Profile } from "../shop.service";

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	profile : Profile;
	form : Profile;
	formVisible = false;

	provinces = ["Ankara", "İzmir", "İstanbul"];
	counties = ["Çankaya", "Elmadağ", "Sincan"];

	@ViewChild(NgForm) formControl : NgForm;

	constructor(private shopService : ShopService) { }

	ngOnInit(): void {
		this.shopService.getProfile().subscribe(profile => this.profile = profile);
	}

	edit() : void {
		this.formVisible = true;
		this.form = JSON.parse(JSON.stringify(this.profile));
	}

	cancel() : void {
		this.formVisible = false;
	}

	save() : void {
		if(this.formControl.invalid) {
			return;
		}

		this.profile = this.form;
		this.formVisible = false;

		this.shopService.updateProfile(this.profile).subscribe();
	}

	cityChanged(city : string) {
		console.log(city);
	}
}
