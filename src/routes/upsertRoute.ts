import { Request, Response, NextFunction } from 'express';
import CustomError from '../Utils/CustomError';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Order } from '../Utils/orderType';
import createOrder from '../functions/createOrder';

export default async function upsertRoute(req: Request, res: Response, next: NextFunction) {
    const order: Order = req.body
    console.log(`order is ${order.id}`)
    console.log("Webhook received")

  //check if the order is coming from valid app id, can set to (order.app_id !== "specific shopify app id")

  
    // save the order data in database and check for error type
    const [data, error] = await createOrder(order)
   
    if (error) {
      if ( error instanceof PrismaClientKnownRequestError) {
      const err = new CustomError(error.message, 404)
        next(err)
      }

      next(error)
    }  else {
      console.log("successfully saved order from shopify")
      res.status(200).json({
        status: "success",
        orderId : data.id
      })
    }
   
}
