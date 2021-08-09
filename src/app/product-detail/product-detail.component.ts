import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Product, ShopService } from "../shop.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

	productId! : string;
	product? : Product;

	addedProduct? : Product;

	constructor(
		private route : ActivatedRoute,
		private shopService : ShopService
	) { }

	ngOnInit(): void {
		/*this.route.paramMap.subscribe(paramMap => {
			this.productId = paramMap.get("productId") as string;

			this.product = this.shopService.currentProduct;
			this.relatedProducts = this.shopService.products.filter(p => this.product?.related.includes(p.id));
		});*/
		
		this.route.paramMap.subscribe(paramMap => {
			this.productId = paramMap.get("productId") as string;

			this.shopService.getProductById(+this.productId).subscribe(product => {
				this.product = product;
			});
			
		});
	}

	showMessage(product : Product) : void {
		this.addedProduct = product;

		setTimeout(() => this.addedProduct = undefined, 3000);
	}

}
