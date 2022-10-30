/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/ 

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('index')
}).as("index")



Route.get('/cadastro', "UserController.signupPage").as("signupView")
Route.post('/signup', "UserController.signup").as("signup")

Route.get('/login', "UserController.loginPage").as("loginView")
Route.post('/login', "UserController.login").as("login")
Route.get('/logout', "UserController.logout").as("logout")
Route.get('/perfil', "UserController.profile").as("profile")
Route.get('/perfil/atualizar', "UserController.updateUserView").as("updateUserView")
Route.post('/updateUser', "UserController.updateUser").as("updateUser")

Route.get('/vendedores', "UserController.sellers").as("sellers");
Route.get('/cadastro/vendedor', "UserController.registerSellerView").as("registerSellerView");
Route.post('/registerSeller', "UserController.registerSeller").as("registerSeller");
Route.get('/vendedor/:id', "UserController.updateSellerView").as("updateSellerView");
Route.post('/updateSeller', "UserController.updateSeller").as("updateSeller");
Route.get('/delete/:id', "UserController.deleteSeller").as("deleteSeller");

Route.get('/cadastro/produto', "ProductController.registerProductView").as("registerProductView");
Route.post('/registerProduct', "ProductController.registerProduct").as("registerProduct");
Route.get('/produtos', "ProductController.products").as("products");
Route.get('/produto/atualizar/:id', "ProductController.updateProductView").as("updateProductView");
Route.post('/updateProduct', "ProductController.updateProduct").as("updateProduct");
Route.get('/shop', "ProductController.shop").as("shop")
Route.get('/produto/:id', "ProductController.productDetails").as("productDetails")

Route.get('/checkout', "OrderController.checkout").as("checkout")
Route.post('/createOrder', "OrderController.createOrder").as("createOrder")
Route.get('/meus-pedidos', "OrderController.userOrders").as("orders")
Route.get('/pedido/:id', "OrderController.orderView").as("orderView")

Route.get('/cadastrar-cartao', 'CardController.registerCardView').as('registerCardView');
Route.post('/registerCard', 'CardController.registerCard').as('registerCard');


