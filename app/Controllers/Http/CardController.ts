// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Card from "App/Models/Card";
import UserController from "./UserController";

export default class CardController {

  public async registerCardView({ response, auth, view }) {
    if(!await UserController.checkLogin(auth)) return response.redirect().toRoute('loginView');

    return view.render('registerCard');
  }

  public async registerCard({ request, response, auth }) {
    if(!await UserController.checkLogin(auth)) return response.redirect().toRoute('loginView');

    const { holder, cvc, number, due_date, name } = request.only(['holder','cvc','number','due_date', 'name']);

    await Card.create({ 
      user_id: auth.use('web')?.user?.id,
      holder, cvc, number, due_date, name
    });

    return response.redirect().toRoute('profile');
  }

}
