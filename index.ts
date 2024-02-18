import express, { Request, Response, NextFunction, response } from 'express';
import dotenv, { config } from 'dotenv'; // For secure environment variable handling
import { PrismaClient } from '@prisma/client';
import validatedShopifySignature from './src/middlewares/Verify';
import rateLimit from 'express-rate-limit';
import CustomError from './src/Utils/CustomError';

const errorHandler  = require("./src/controllers/errorHandler")
import { param } from 'express-validator';
import updateOrderHandler from './src/routes/updateRoute';
import upsertRoute from './src/routes/upsertRoute';
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
app.put("/webhooks/orders/update/:id",
validateParams, 
validatedShopifySignature(), 
updateOrderHandler
)


//order creation route
app.post('/webhooks/orders/create',
  // validate the request using middleware
  validatedShopifySignature(),
  upsertRoute

  );

  
  //error handle all unauthorised routes
  app.all('*', (req : Request, res : Response, next : NextFunction) => {
    const err = new CustomError(`can't find ${req.originalUrl} on the server`, 404) 
       next(err)
  })


//global error handling middleware
  app.use(errorHandler)


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
