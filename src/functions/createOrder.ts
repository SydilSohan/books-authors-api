import { Order } from "../Utils/orderType";
import { PrismaClient } from "@prisma/client";
const prisma  = new PrismaClient()
export default async function createOrder(orderData : Order) {
    try {
     const newOrder = await prisma.orders.create({
          data: {
            client_details: orderData.client_details,
            current_total_price: orderData.current_total_price,
            billing_address: orderData.billing_address,
            confirmation_number: orderData.confirmation_number,
            current_total_additional_fees_set: orderData.current_total_additional_fees_set,
            buyer_accepts_marketing: orderData.buyer_accepts_marketing,
            company : orderData.company,
            cancelled_reason : orderData.cancel_reason
          }

        })
       return [newOrder, null]
      } catch (error: any) {
       return [null, error]
      }
}