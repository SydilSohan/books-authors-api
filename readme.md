Shopify webhook listener server 
to start locally clone then
>npm i
> npm start
>setup environment variable in .env 
> npx prisma migrate dev
>ensure postgres is installed and running
> npm prisma studio > then localhost:5555 to go to studio
> npm run dev
> on vscode go to ports tab besides terminal > click on forward a port > enter the port number presumably 3000 > click allow firewall if prompt comes > you’ll see the port running, now right click on it, click on port visibility and set it to public, you can now test it on shopify admin area, add the forwarded address as a webhook
 

	
Endpoints are
	/webhooks/orders/create (post) – will update an order checking against “id”, if doesn’t exist will create one
	/webhooks/orders/update/”order id here” (put) – will only update the order

