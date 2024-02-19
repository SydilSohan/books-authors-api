import { Order } from "../Utils/orderType";
import { PrismaClient } from "@prisma/client";
const prisma  = new PrismaClient()
export default async function createOrder(orderData : Order) {
    try {

      //using upsert fucntion to create row if doesnt exist
     const newOrder = await prisma.orders.upsert({
      where : {order_id : orderData.id.toString()},
      update : {     client_details: orderData.client_details,
        current_total_price: orderData.current_total_price,
        billing_address: orderData.billing_address,
        confirmation_number: orderData.confirmation_number,
        current_total_additional_fees_set: orderData.current_total_additional_fees_set,
        buyer_accepts_marketing: orderData.buyer_accepts_marketing,
        company : orderData.company,
        cancelled_reason : orderData.cancel_reason,
       },
          create: {
            
            client_details: orderData.client_details,
            current_total_price: orderData.current_total_price,
            billing_address: orderData.billing_address,
            confirmation_number: orderData.confirmation_number,
            current_total_additional_fees_set: orderData.current_total_additional_fees_set,
            buyer_accepts_marketing: orderData.buyer_accepts_marketing,
            company : orderData.company,
            cancelled_reason : orderData.cancel_reason,
           order_id : orderData.id.toString()
          }

        })
       return [newOrder, null]
      } catch (error: any) {
       return [null, error]
      }
}