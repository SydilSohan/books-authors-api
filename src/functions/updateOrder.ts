import { Order } from "../Utils/orderType";
import { PrismaClient, Orders } from "@prisma/client";
const prisma  = new PrismaClient()
export default async function updateOrder(id : number, orderData : Order) {
    try {
     const updatedOrder  = await prisma.orders.update({
        where : { order_id : id.toString()},
        data : { 
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
   
       return [updateOrder, null]
      } catch (error: any) {
       return [null, error]
      }
}