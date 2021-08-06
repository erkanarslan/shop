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
		this.orders = this.shopService.orders;
	}

}
