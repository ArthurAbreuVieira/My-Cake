import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product';

import UserController from "./UserController";

export default class ProductController {

  public async registerProductView({ response, auth, view }: HttpContextContract) {
    if(!await UserController.checkLogin(auth)) return response.redirect().toRoute("loginView");

    return view.render('registerProduct');
  }

  public async registerProduct({ request, response }: HttpContextContract) {
    const { name, description, value } = request.only(['name','description','value']);

    await Product.create({name, description, value});

    response.redirect().toRoute('shop');
  }

  public async products({ response, view, auth }:HttpContextContract) {
    if(!await UserController.checkLogin(auth)) return response.redirect().toRoute("loginView");

    const products = await Product.all();

    return view.render('products', { products });
  }

  public async updateProductView({ response, params, view, auth }: HttpContextContract) {
    if(!await UserController.checkLogin(auth)) return response.redirect().toRoute("loginView");

    const product = await Product.find(params.id);

    return view.render("updateProduct", { product });
  }
  
  public async updateProduct({ request, response, params, view, auth }: HttpContextContract) {
    if(!await UserController.checkLogin(auth)) return response.redirect().toRoute("loginView");

    const { id, name, description, value } = request.only(['id','name', 'description','value']);

    const product = await Product.find(id);

    if(!product) return response.redirect().toRoute("products");

    product.name = name;
    product.description = description;
    product.value = value;

    await product.save();

    return response.redirect().toRoute("products");
  }

  public async shop({ response, view }) {
    const products = await Product.all();

    return view.render('shop', {products});
  }

  public async productDetails({ params, response, view }: HttpContextContract) {
    const product = await Product.find(params.id);

    if(!product) return response.redirect().toRoute('products');

    return view.render('productDetails', {product});
  }

  public async checkout({ request, params, response, view, auth }: HttpContextContract) {
    if(!await UserController.checkLogin(auth)) return response.redirect().toRoute("loginView");
    
    const { product: productId, quantity } = request.qs();

    if(!productId) return response.redirect().toRoute("shop");

    const product = await Product.find(productId);

    if(!product) return response.redirect().toRoute("shop");

    return view.render("checkout", {product, quantity});
  }

}
