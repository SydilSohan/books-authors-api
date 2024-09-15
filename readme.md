# Books and Authors Backend

This repository contains a backend server for managing books and authors. It provides endpoints to create, retrieve, update, and delete authors and books, as well as custom views to retrieve detailed information about authors and books.

## Getting Started

To run the server locally, follow these steps:

### Prerequisites

- Node.js (version 14.x or higher recommended)
- PostgreSQL (ensure it is installed and running)

### Installation

1. **Clone the repository to your local machine:**

    ```bash
    git clone https://github.com/yourusername/books-authors-backend.git
    cd books-authors-backend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory and add the necessary configurations. You can use `.env.example` as a reference.

    ```env
    DATABASE_URL=postgresql://<username>:<password>@<hostname>:<port>/<database>
    PORT=3000
    ```

4. **Run Prisma migrations to set up the database:**

    ```bash
    npx prisma migrate dev
    ```

5. **Seed the database with initial data:**

    ```bash
    npm run seed
    ```

6. **Run Prisma Studio to manage your database:**

    ```bash
    npx prisma studio
    ```

    Visit [http://localhost:5555](http://localhost:5555) in your browser to access Prisma Studio.

### Running the Server

**Note:** There are some import issues when using `npm run start`, possibly due to the Node.js version. It is recommended to use `npm run dev` instead.

1. **Start the server in development mode:**

    ```bash
    npm run dev
    ```

    This will start the server using [`nodemon`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fd%3A%2FWork%2Fbackend-test%2FshopifyOrderHook%2Fpackage.json%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A8%2C%22character%22%3A12%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fd%3A%2FWork%2Fbackend-test%2FshopifyOrderHook%2Freadme.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A61%2C%22character%22%3A38%7D%7D%5D%2C%22a01df17c-71e9-40d0-a230-5cf0f87d7e1e%22%5D "Go to definition"), which automatically restarts the server when file changes are detected.

2. **Alternatively, start the server in production mode (may encounter import issues):**

    ```bash
    npm run start
    ```

### Usage

The server exposes the following endpoints:

#### Authors

- `POST /api/authors`: Create a new author.
- `GET /api/authors`: Retrieve all authors.
- `GET /api/authors/:id`: Retrieve an author by ID.
- `GET /api/authors/with-books`: Retrieve all authors with their respective books.
- `GET /api/authors/:id/details`: Retrieve detailed information about an author, including their books.
- `DELETE /api/authors/:id`: Delete an author by ID.

#### Books

- `POST /api/books`: Create a new book.
- `GET /api/books`: Retrieve all books.
- `GET /api/books/:id`: Retrieve a book by ID.
- `GET /api/books/:id/details`: Retrieve detailed information about a book, including its author.
- `DELETE /api/books/:id`: Delete a book by ID.

### Testing

You can use Postman or any other API testing tool to test the endpoints. A Postman collection schema is provided in the repository for your convenience.

### Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.

### License

This project is licensed under the MIT License.

### Note to Interviewer:

This project is part of a skill test. Please be aware of the import issues when using `npm run start`. It is recommended to use `npm run dev` for a smoother experience. The import issues might be related to the Node.js version or the way module resolution is handled in the production build.

Thank you for reviewing my project!