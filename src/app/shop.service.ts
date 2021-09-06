import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ShopService {

	orders : Order[] | null = null;
	basket : Product[] = [];
	products : Product[] = []

	currentProduct : Product | null = null;

	constructor(private http : HttpClient) { }

	getProducts() : Observable<Product[]> {
		return this.http.get<Product[]>("/api/products").pipe(
			tap(products => this.products = products)
		);
	}

	getProductById(id : number) : Observable<Product> {
		return this.http.get<Product>("/api/products/" + id);
	}

	createOrder(order : Order) : Observable<Order> {
		return this.http.post<Order>("/api/orders", order).pipe(
			tap(order => {
				order.createdAt = new Date(order.createdAt);
				if(this.orders) {
					this.orders.push(order);
				}
			})
		);
	}

	getOrders() : Observable<Order[]> {
		if(!this.orders) {
			return this.http.get<Order[]>("/api/orders").pipe(
				tap(orders => this.orders = orders)
			);
		}
		else {
			return of(this.orders);
		}
	}

	deleteOrder(orderId : number) : Observable<void> {
		return this.http.delete<void>("/api/orders/" + orderId);
	}

	getProfile() : Observable<Profile> {
		return this.http.get<Profile>("/api/profile");
	}

	updateProfile(profile : Profile) : Observable<void> {
		return this.http.put<void>("/api/profile", profile);
	}
}

export type Order = {
	id? : number,
	count : number,
	cost : number,
	createdAt? : Date
}

export type Product = {
	id : number,
	name : string,
	photoPath : string,
	price : number,
	unit : string,
	quantity : number,
	info : string,
	related : number[],
	relatedProducts? : Product[]
}

export type Profile = {
	name : string,
	phone : string,
	address : {
		address : string,
		province : string,
		county : string
	},
	receiveSMS : boolean
};