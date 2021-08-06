import { Component } from '@angular/core';
import { products } from "../products";
import { ShopService, Order, Product } from "../shop.service";

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.css']
})
export class ProductsComponent {

	products = products;
	basket! : Product[];

	constructor(private shopService : ShopService) {}

	ngOnInit() : void {
		this.basket = this.shopService.basket;
	}

	getTotal() : number {
		let total = 0;

		for(let item of this.basket) {
			total += item.price * item.quantity;
		}

		return total;
	}

	createOrder() : void {
		let order : Order = {
			count : this.basket.length,
			cost : this.getTotal()
		};

		this.shopService.orders.push(order);

		for(let item of this.basket) {
			item.quantity = 0;
		}
		this.basket.length = 0;
	}

}
