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

Route.get('/shop', async ({ view, auth }) => {
  await auth.use('web').check();
  console.log(auth.use('web').user);
  
  return view.render('shop')
}).as("shop")

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
