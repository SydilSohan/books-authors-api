import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import CustomError from '../Utils/CustomError';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Order } from '../Utils/orderType';
import updateOrder from '../functions/updateOrder';

export default async function updateOrderHandler(req: Request, res: Response, next: NextFunction) {
  const order: Order = req.body;

  // Validate request parameters
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Check if the order is coming from a valid app id
  if (!order.app_id) {
    const err = new CustomError("no valid app id", 401);
    return next(err);
  }

  const { id } = req.params;
  const numId = parseInt(id);

  // Save the order data in the database and handle errors
  const [data, error] = await updateOrder(numId, order);
  if (data) {
    return res.status(200).json({
      status: "success",
      data: data
    });
  }
  if (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      const err = new CustomError(error.message, 404);
      return next(err);
    }
    return next(error);
  }

  console.log("Webhook received for update");
}
