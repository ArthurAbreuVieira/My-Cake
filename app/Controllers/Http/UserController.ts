import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { AuthContract } from '@ioc:Adonis/Addons/Auth';

import Hash from '@ioc:Adonis/Core/Hash';

import User from 'App/Models/User';

export default class UserController {
  public async loginPage({ view, auth, response }: HttpContextContract) {    
    if(await UserController.checkLogin(auth)) 
      return response.redirect().toRoute("index");

    return view.render("login");
  }

  public async signupPage({ view, response, auth }: HttpContextContract) {
    if(await UserController.checkLogin(auth)) 
      return response.redirect().toRoute("index");

    return view.render("signup");
  } 

  public async signup({ request, response }: HttpContextContract) {
    const { name, email, password, cpf } = request.only(['name','email','password', 'cpf']);

    await User.create({name, email, cpf, password: await Hash.make(password)});

    response.redirect().toRoute('loginView');
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const { email, password } = request.only(["email", "password"]);

    await auth.use("web").attempt(email, password);
    
    return response.redirect().toRoute("index");
  }  

  public static async checkLogin(auth: AuthContract) {
    await auth.use('web').check();
    const isLoggedIn = auth.isLoggedIn;
    return isLoggedIn;
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout();

    response.redirect().toRoute("index");
  }

  public async profile({ response, auth, view }: HttpContextContract) {
    if(!await UserController.checkLogin(auth)) 
      return response.redirect().toRoute("loginView");

    return view.render("profile");
  }

  public async sellers({ response, auth, view }: HttpContextContract) {
    if(!await UserController.checkLogin(auth)) return response.redirect().toRoute("loginView");
    if(auth.use('web').user?.role !== "admin") return response.redirect().toRoute("loginView");

    const sellers = await User.query().where('role', 'seller');

    return view.render("sellers", {sellers});
  }

  public async registerSellerView({ response, auth, view }: HttpContextContract) {
    if(!await UserController.checkLogin(auth)) return response.redirect().toRoute("loginView");
    if(auth.use('web').user?.role !== "admin") return response.redirect().toRoute("loginView");

    return view.render("registerSeller");
  }

  public async registerSeller({ request, response }: HttpContextContract) {
    const { name, email, password, cpf } = request.only(['name','email','password', 'cpf']);

    const password_hash = await Hash.make(password);    

    await User.create({
      name, email, cpf, password:password_hash, role: "seller"
    });

    return response.redirect().toRoute("sellers");
  }

  public async updateSellerView({ params, response, auth, view }: HttpContextContract) {
    if(!await UserController.checkLogin(auth)) return response.redirect().toRoute("loginView");
    if(auth.use('web').user?.role !== "admin") return response.redirect().toRoute("loginView");

    const sellerId = params.id;
    const seller = await User.find(sellerId);    

    if(!seller) return response.redirect().toRoute("sellers");

    return view.render("updateSeller", { seller });
  }

  public async updateSeller({ request, response, auth }: HttpContextContract) {
    if(!await UserController.checkLogin(auth)) return response.redirect().toRoute("loginView");
    if(auth.use('web').user?.role !== "admin") return response.redirect().toRoute("loginView");

    const { id, name, email, password} = request.only(['id', 'name', 'email', 'password']);
    const seller = await User.find(id);    

    if(!seller) return response.redirect().toRoute("sellers");

    seller.name = name;
    seller.email = email;
    seller.password = await Hash.make(password);

    await seller.save();

    return response.redirect().toRoute('sellers');
  }

  public async deleteSeller({ params, response, auth}: HttpContextContract) {
    if(!await UserController.checkLogin(auth)) return response.redirect().toRoute("loginView");
    if(auth.use('web').user?.role !== "admin") return response.redirect().toRoute("loginView");

    const sellerId = params.id;
    const seller = await User.find(sellerId);    

    if(!seller) return response.redirect().toRoute("sellers");

    seller.delete();

    return response.redirect().toRoute('sellers');
  }
    
  public async updateUserView({ response, auth, view }: HttpContextContract) {
    if(!await UserController.checkLogin(auth)) return response.redirect().toRoute("loginView");

    return view.render('updateUser');
  }
    
  public async updateUser({ request, response, auth }: HttpContextContract) {
    if(!await UserController.checkLogin(auth)) return response.redirect().toRoute("loginView");

    const id = auth.use('web').user?.id;
    const user = await User.find(id); 
    
    if(!user) return response.redirect().toRoute("profile");

    const { name, email, password } = request.only(['name','email','password']);

    user.name = name;
    user.email = email;
    user.password = await Hash.make(password);
    
    user.save();

    return response.redirect().toRoute('profile');
  }
}
