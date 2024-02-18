
# Shopify Webhook Listener Server

This repository contains a webhook listener server built for Shopify. It listens for incoming webhook events from Shopify, such as order creations and updates, and processes them accordingly.

## Getting Started

### Clone the repository

```bash
git clone https://github.com/SydilSohan/shopifyOrderHook.git
```

### Install dependencies

```bash
npm install
```

### Set up environment variables

Create a `.env` file and add necessary configurations.

### Run Prisma migrations

```bash
npx prisma migrate dev
```

Ensure that PostgreSQL is installed and running on your machine.

### Run Prisma Studio

```bash
npm run prisma studio
```

Visit `localhost:5555` in your browser to access Prisma Studio.

### Start the server

```bash
npm run dev
```

If you are using Visual Studio Code, you can forward a port to make it publicly accessible. Follow these steps:

- Go to the "Ports" tab beside the terminal.
- Click on "Forward a Port" and enter the port number (e.g., 3000).
- Click "Allow firewall" if prompted.
- Right-click on the forwarded port and select "Port Visibility." Set it to "Public."

## Usage

The server exposes the following endpoints:

- `POST /webhooks/orders/create`: This endpoint is used to update an order. If the order doesn't exist, it will create a new one.
- `PUT /webhooks/orders/update/:orderId`: This endpoint is used to update an existing order.

## Testing

After setting up the server, you can test it on the Shopify Admin area by adding the forwarded address as a webhook.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
```

Copy the formatted text above into your README.md file, and it will render properly when