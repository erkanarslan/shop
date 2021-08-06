import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

	orders : Order[] = [];
	basket : Product[] = [];

	constructor() { }
}

export type Order = {
	count : number,
	cost : number
}

export type Product = {
	id : number,
	name : string,
	photoPath : string,
	price : number,
	unit : string,
	quantity : number,
	info : string,
	related : number[]
}