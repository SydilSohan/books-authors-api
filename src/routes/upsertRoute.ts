import { Request, Response, NextFunction } from 'express';
import CustomError from '../Utils/CustomError';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Order } from '../Utils/orderType';
import createOrder from '../functions/createOrder';

export default async function upsertRoute(req: Request, res: Response, next: NextFunction) {
    const order: Order = req.body
    console.log(`order is ${order.id}`)
  //check if the order is coming from valid app id, can set to (order.app_id !== "specific shopify app id")

    if (!order.app_id) {
      const err = new CustomError("no valid app id", 401)
      next(err)
    }
    // save the order data in database and check for error type
    const [data, error] = await createOrder(order)
    if(data) {
      res.status(200).json({
        status : "success",
        data
       }) 
    }
    if (error) {
      if ( error instanceof PrismaClientKnownRequestError) {
      const err = new CustomError(error.message, 404)
        next(err)
      }

      next(error)
    } 
   
    console.log("Webhook received")
}
