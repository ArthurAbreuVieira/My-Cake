import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order';
import Product from 'App/Models/Product';
import { DateTime } from 'luxon';
import UserController from './UserController';

export default class OrderController {
  public async checkout({ request, response, view, auth }: HttpContextContract) {
    if(!await UserController.checkLogin(auth)) return response.redirect().toRoute("loginView");
    
    const { product: productId, quantity } = request.qs();

    if(!productId) return response.redirect().toRoute("orders");

    const product = await Product.find(productId);

    if(!product) return response.redirect().toRoute("orders");

    await auth.use('web').user?.load('cards');

    return view.render("checkout", {product, quantity});
  }

  public async createOrder({ request, response, auth, session }: HttpContextContract) {
    await auth.use('web').check();
    const { product_id, address, quantity, card_id, due_date, cvc,  } = request.only(['product_id', 'address', 'quantity', 'card_id', 'due_date', 'cvc', ]);
  
    await auth.use('web').user?.load('cards', query => {
      query.where('id', card_id);
    });

    const card = auth.use('web')?.user?.cards[0];
    

    if(card?.cvc !== cvc || card?.due_date !== due_date) {
      session.flash('error','Dados de pagamento invalidos!');
      return response.redirect().withQs({product:product_id,quantity}).toRoute('checkout');
    }

    await Order.create({
      user_id: auth.use('web')?.user?.id,
      product_id, 
      card_id,
      address,
      quantity,
      order_date: DateTime.now()
    });

    return response.redirect().toRoute('orders');
  }

  public async userOrders({ auth, response, view }: HttpContextContract) {
    if(!await UserController.checkLogin(auth)) return response.redirect().toRoute("loginView");

    const userId = auth.use('web')?.user?.id;

    const orders = await Order.query().where('user_id', userId as number)
    
    return view.render("orders", {orders});
  }

  public async orderView({ params, auth, response, view }) {
    if(!await UserController.checkLogin(auth)) return response.redirect().toRoute("loginView");

    
    const order = await Order.find(params.id);

    if(!order || order.user_id !== auth.use('web').user.id) 
      return response.redirect().toRoute("orders");
    
    await order.load('product');
    await order.load('card');
    

    return view.render("order", {order});
  }
}
