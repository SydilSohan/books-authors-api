import express, { Request, Response, NextFunction, response } from 'express';
import dotenv, { config } from 'dotenv'; // For secure environment variable handling
import { Order } from './src/Utils/orderType';
import { PrismaClient } from '@prisma/client';
import validatedShopifySignature from './src/middlewares/Verify';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import rateLimit from 'express-rate-limit';
import CustomError from './src/Utils/CustomError';
import createOrder from './src/functions/createOrder';
import updateOrder from './src/functions/updateOrder';
const errorHandler  = require("./src/controllers/errorHandler")
import { param, query, validationResult } from 'express-validator';
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
declare module 'http' {
  interface IncomingMessage {
      rawBody: any;
  }
}

app.use(express.json({
  limit: "50mb",
  verify(req, res, buf, encoding) {
    req.rawBody = buf
  },
}))
const prisma = new PrismaClient()
// Use type alias for clarity
type HmacFunction = (data: string) => string;
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Use an external store for consistency across multiple server instances.
})
// Apply the rate limiting middleware to all requests.
app.use(limiter)

const validateParams = [
  // Example validation rule for the 'id' parameter
  param('id').notEmpty().isInt().toInt(), // Ensure 'id' is not empty and is an integer
  // Add more validation rules as needed for other parameters
];
app.put("/webhooks/orders/update/:id",validateParams, validatedShopifySignature(), async(req : Request, res : Response, next : NextFunction) => {
  const order: Order = req.body
//check if the order is coming from valid app id, can set to (order.app_id !== "specific shopify app id")
  const errors  = validationResult(req)
  console.log(`errors are in validation ${JSON.stringify(errors)}`)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  if (!order.app_id) {
    const err = new CustomError("no valid app id", 401)
    next(err)
  }
  const {id} = req.params
  console.log(id)
  // save the order data in database and check for error type
  const [data, error] = await updateOrder(parseInt(id), order)
  if(data) {
    res.status(200).json({
      status : "success",
      data : data
     }) 
  }
  if (error) {
    if ( error instanceof PrismaClientKnownRequestError) {
    const err = new CustomError(error.message, 404)
      next(err)
    }

    next(error)
  } 
 
  console.log("Webhook received for update")
  
} )
//order creation route
app.post('/webhooks/orders/create',
  // validate the request using middleware
  validatedShopifySignature(),
  async (req: Request, res: Response, next : NextFunction) => {
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
    
  });
  //error handle all unauthorised routes
  app.all('*', (req : Request, res : Response, next : NextFunction) => {
    const err = new CustomError(`can't find ${req.originalUrl} on the server`, 404) 
       next(err)
  })
//global error handling middleware
  app.use(errorHandler)


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
