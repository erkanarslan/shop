import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ProductsComponent } from "./products/products.component";
import { OrdersComponent } from "./orders/orders.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";

const routes : Routes = [
	{path : '', redirectTo : 'products', pathMatch : 'full'},
	{path : 'products', component : ProductsComponent},
	{path : 'orders', component : OrdersComponent},
	{path : 'products/:productId', component : ProductDetailComponent}
];

@NgModule({
	imports : [RouterModule.forRoot(routes)],
	exports : [RouterModule]
})
export class AppRoutingModule {}