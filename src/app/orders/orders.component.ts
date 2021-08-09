import { Component, OnInit } from '@angular/core';
import { ShopService, Order } from "../shop.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

	orders : Order[] = [];

	constructor(private shopService : ShopService) {}

	ngOnInit(): void {
		this.shopService.getOrders().subscribe(orders => this.orders = orders);
	}

	deleteOrder(orderId : number) : void {
		this.shopService.deleteOrder(orderId).subscribe(() => {
			let index = this.orders.findIndex(order => order.id == orderId);
			this.orders.splice(index, 1);
		});
	}

}
