import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { AuthContract } from '@ioc:Adonis/Addons/Auth';

import Hash from '@ioc:Adonis/Core/Hash';

import User from 'App/Models/User';

export default class UserController {
  public async loginPage({ view, auth, response }: HttpContextContract) {    
    if(await this.checkLogin(auth)) 
      return response.redirect().toRoute("index");

    return view.render("login");
  }

  public async signupPage({ view, response, auth }: HttpContextContract) {
    if(await this.checkLogin(auth)) 
      return response.redirect().toRoute("index");

    return view.render("signup");
  } 

  public async signup({ request, response }: HttpContextContract) {
    const { name, email, password } = request.only(['name','email','password']);

    await User.create({name, email, password: await Hash.make(password)});

    response.redirect().toRoute('loginView');
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const { email, password } = request.only(["email", "password"]);

    const user = await auth.use("web").attempt(email, password);
    
    return response.redirect().toRoute("index");
  }  

  private async checkLogin(auth: AuthContract) {
    await auth.use('web').check();
    const isLoggedIn = auth.isLoggedIn;
    return isLoggedIn;
  }

  public async logout({ auth, response }) {
    await auth.logout();

    response.redirect().toRoute("index");
  }

  public async profile({ response, auth, view }) {
    if(!await this.checkLogin(auth)) 
      return response.redirect().toRoute("index");

    return view.render("profile");
  }
}
