import express, { Request, Response, NextFunction, response } from 'express';
import dotenv, { config } from 'dotenv'; // For secure environment variable handling
import { Order } from './Utils/orderType';
import { PrismaClient } from '@prisma/client';
import validatedShopifySignature from './middleware/Verify';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import rateLimit from 'express-rate-limit';
import CustomError from './Utils/CustomError';
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
app.post('/webhooks/orders/create',
  // validate the request using middleware
  validatedShopifySignature(),
  async (req: Request, res: Response, next : NextFunction) => {
    //creating necessary parameters for verifySignature function to validate the request
    // const secretKey = process.env.SHOPIFY_SIGNATURE_SECRET; 
    // const url = req.url;
    // const body = JSON.stringify(req.body);
    // const signature = req.headers['x-shopify-hmac-sha256'] as string;
    const order: Order = req.body
    if (!order.app_id) {
      const err = new CustomError("no valid app id", 401)
      next(err)
    }
    let newOrder 
    // save the order data in database
    try {
      newOrder = await prisma.orders.create({
        data: {
          client_details: order.client_details,
          current_total_price: order.current_total_price,
          billing_address: order.billing_address,
          confirmation_number: order.confirmation_number,
          current_total_additional_fees_set: order.current_total_additional_fees_set,
          buyer_accepts_marketing: order.buyer_accepts_marketing,
          company : order.company,
          cancelled_reason : order.cancel_reason
        }
      })
     
    } catch (error: any) {
      if (error instanceof PrismaClientKnownRequestError) {
       const error = new CustomError("Error Occured in ORM", 400)
       next(error)
      }
    }
    res.status(200).json({
      status : newOrder ? "completed" : "fail",
      data : newOrder || null
     
    }) 
    console.log("Webhook received")
    
  });
  //error handle all unauthorised routes
  app.all('*', (req : Request, res : Response, next : NextFunction) => {
    const err = new CustomError(`can't find ${req.originalUrl} on the server`, 404) 
       next(err)
  })
//global error handling middleware
  app.use((error : any, req : Request, res : Response, next : NextFunction) => {
    error.statusCode  =  error.statusCode || 500;
    error.status = error.status || "error";
    error.message = error.message || "Internal server error"
    res.status(error.statusCode).json({
      status : error.status,
      message : error.message,
      statusCode : error.statusCode
    })
    })
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
