import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Product } from "../shop.service";
import { products } from "../products";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

	productId! : string;
	product? : Product;

	relatedProducts : Product[] = [];
	addedProduct? : Product;

	constructor(private route : ActivatedRoute) { }

	ngOnInit(): void {
		this.route.paramMap.subscribe(paramMap => {
			this.productId = paramMap.get("productId") as string;
			this.product = products.find(p => p.id == Number(this.productId));

			this.relatedProducts = products.filter(p => this.product?.related.includes(p.id));
		});
	}

	showMessage(product : Product) : void {
		this.addedProduct = product;

		setTimeout(() => this.addedProduct = undefined, 3000);
	}

}
