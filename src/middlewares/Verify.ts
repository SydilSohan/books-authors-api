import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import CustomError from '../Utils/CustomError';
// Use a type for environment variables to ensure correct usage
interface Env {
	SHOPIFY_SIGNATURE_SECRET: string;
}
// Get Shopify signature secret securely from environment variables or a configuration file
const dotenv = require('dotenv').config();
const config = dotenv.parsed as Env;
if (!config || !config.SHOPIFY_SIGNATURE_SECRET) {
	throw new CustomError('Please provide SHOPIFY_SIGNATURE_SECRET in environment variables or a configuration file.', 500);
}	
type HmacFunction = (data: string) => string;
const SHOPIFY_SIGNATURE_SECRET = process.env.SHOPIFY_SIGNATURE_SECRET
if (!SHOPIFY_SIGNATURE_SECRET) {
	throw new CustomError('Please provide process.env.SHOPIFY_SIGNATURE_SECRET', 501)
}
export default function validatedShopifySignature() {
	return async (req: Request, res: Response, next: NextFunction) => {
		console.log(`header is ${JSON.stringify(req.headers)}`)

		try {
			const rawBody = req.rawBody
			// console.log(JSON.parse(req.rawBody))
			if (typeof rawBody == 'undefined') {
				throw new CustomError(
					'validateShopifySignature: body is undefined. Please make sure the raw request body is available as body.', 404
				)
			}
			const hmac = req.headers['x-shopify-hmac-sha256']
			const hash = crypto.createHmac('sha256', SHOPIFY_SIGNATURE_SECRET).update(rawBody).digest('base64')
			console.log(`hmac is ${hmac} and hash is ${hash}}`)
			const signatureOk = crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(hmac.toString()))
			if (!signatureOk) {
				const error = new CustomError("keys doesn't match", 401)
				return next(error)
			}
			next()
		} catch (err) {
			next(err)
		}
	}
}
