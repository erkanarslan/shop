import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ShopService, Product } from "../../shop.service";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

	@Input()
	product! : Product;

	@Output()
	productAdded = new EventEmitter<Product>();

	basket! : Product[];

	constructor(
		private shopService : ShopService
	) { }

	ngOnInit(): void {
		this.basket = this.shopService.basket;
	}

	decreaseAmount(product : Product) : void {
		// Ürün miktarı 0 ise bir şey yapma
		if(product.quantity == 0) {
			return;
		}

		// Ürün miktarını azalt
		product.quantity--;

		// Ürün miktarı 0 olursa sepetten çıkar
		this.removeIfZero(product);
	}

	increaseAmount(product : Product) : void {
		// Ürün miktarını artır
		product.quantity++;

		// Sepette yoksa ekle
		this.addIfNotInBasket(product);
	}

	removeIfZero(product : Product) : void {
		if(product.quantity == 0) {
			let index = this.basket.indexOf(product);
			this.basket.splice(index, 1);
		}
	}

	addIfNotInBasket(product : Product) : void {
		if(!this.basket.includes(product) && product.quantity > 0) {
			this.basket.push(product);

			this.productAdded.emit(product);
		}
	}

	updateBasket(product : Product) : void {
		// Ürün miktarı 0 olursa sepetten çıkar
		this.removeIfZero(product);

		// Sepette yoksa ekle
		this.addIfNotInBasket(product);
	}

	setCurrentProduct() : void {
		this.shopService.currentProduct = this.product;
	}

}
