import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order';
import User from 'App/Models/User';
import { DateTime } from 'luxon';
import UserController from './UserController';

export default class OrderController {
  public async createOrder({ request, response, auth }: HttpContextContract) {
    await auth.use('web').check();
    const { product_id, address, quantity } = request.only(['product_id', 'address', 'quantity']);

    await Order.create({
      user_id: auth.use('web')?.user?.id,
      product_id, 
      address,
      quantity,
      order_date: DateTime.now()
    });

    return response.redirect().toRoute('orders');
  }

  public async userOrders({ auth, response, view }) {
    if(!await UserController.checkLogin(auth)) return response.redirect().toRoute("loginView");

    const userId = auth.use('web').user.id;

    const orders = await Order.query().where('user_id', userId);
    
    return view.render("orders", {orders});
  }

  public async orderView({ params, auth, response, view }) {
    if(!await UserController.checkLogin(auth)) return response.redirect().toRoute("loginView");

    
    const order = await Order.find(params.id);

    if(!order || order.user_id !== auth.use('web').user.id) 
      return response.redirect().toRoute("orders");
    
    await order.load('product');    

    console.log(order)

    return view.render("order", {order});
  }
}
