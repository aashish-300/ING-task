var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"routes","filename":"src/app/app-routing.module.ts","module":"AppRoutingModule","children":[{"path":"","component":"HomeComponent","canActivate":["AuthGuard","RoleGuard"],"data":{"allowedRoles":["admin","supervisor"]}},{"path":"login","component":"LoginComponent"},{"path":"register","component":"RegisterComponent"},{"path":"user","component":"UserlistComponent","loadChildren":"./modules/user/user.module#UserModule","canActivate":["AuthGuard","RoleGuard"],"data":{"allowedRoles":["admin"]},"children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/modules/user/user-routing.module.ts","module":"UserRoutingModule","children":[{"path":"user","component":"UserlistComponent"}],"kind":"module"}],"module":"UserModule"}]},{"path":"product","component":"ProductsComponent","loadChildren":"./modules/product/product.module#ProductModule","canActivate":["AuthGuard","RoleGuard"],"data":{"allowedRoles":["admin","supervisor","salesperson"]},"children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/modules/product/product-routing.module.ts","module":"ProductRoutingModule","children":[{"path":"product","component":"ProductsComponent"}],"kind":"module"}],"module":"ProductModule"}]},{"path":"addItems","component":"AddItemsComponent","loadChildren":"./modules/add-items/add-items.module#AddItemsModule","canActivate":["AuthGuard","RoleGuard"],"data":{"allowedRoles":["admin","supervisor","salesperson"]},"children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/modules/add-items/add-items-routing.module.ts","module":"AddItemsRoutingModule","children":[{"path":"addItems","component":"AddItemsComponent"}],"kind":"module"}],"module":"AddItemsModule"}]},{"path":"sellItems","component":"SellItemsComponent","loadChildren":"./modules/sell-items/sell-items.module#SellItemsModule","canActivate":["AuthGuard","RoleGuard"],"data":{"allowedRoles":["admin","salesperson"]},"children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/modules/sell-items/sell-items-routing.module.ts","module":"SellItemsRoutingModule","children":[{"path":"sellItems","component":"SellItemsComponent"}],"kind":"module"}],"module":"SellItemsModule"}]}],"kind":"module"}]}