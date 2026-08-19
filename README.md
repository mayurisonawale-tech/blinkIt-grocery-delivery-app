# blinkIt delivery app

A Blinkit-style quick-commerce delivery app clone. This repository holds **both** the Angular
frontend and the Node.js/Express + MongoDB backend in a single monorepo.

## Repository structure

```
blinkIt-delivery-app/
├── Blinkit-delivery-app-Frontend/
│   └── Blinkit-clone-proj/        # Angular 13 SPA (user storefront + admin panel)
└── blinkit-delivery-app-API/
    └── blinkit-clone-api/         # Express 5 REST API backed by MongoDB (Mongoose)
```

## Tech stack

| Layer    | Stack                                                        |
| -------- | ------------------------------------------------------------ |
| Frontend | Angular 13, TypeScript, RxJS, Bootstrap 5, ngx-bootstrap, SCSS |
| Backend  | Node.js, Express 5, Mongoose 9, dotenv                        |
| Database | MongoDB                                                      |

## Features

- **Storefront** — browse categories, product listings, product details
- **Cart** — add to cart, remove from cart, view populated cart items per user
- **User auth** — register and login
- **Admin panel** — admin login, add/edit categories, add/edit products

## Getting started

### Prerequisites

- Node.js 18+ and npm
- A MongoDB instance (local or MongoDB Atlas)
- Angular CLI 13 (`npm install -g @angular/cli@13`)

### 1. Backend

```bash
cd blinkit-delivery-app-API/blinkit-clone-api
npm install
cp .env.example .env      # then fill in your MongoDB connection string
npm run dev               # nodemon app.js
```

The API starts on **http://localhost:3000**.

Environment variables (see `.env.example`):

| Variable      | Description                        |
| ------------- | ---------------------------------- |
| `MONGODB_URI` | MongoDB connection string          |

> `.env` is git-ignored — never commit real credentials.

### 2. Frontend

```bash
cd Blinkit-delivery-app-Frontend/Blinkit-clone-proj
npm install
npm start                 # ng serve
```

The app is served on **http://localhost:4200** and expects the API at `http://localhost:3000`.

## API endpoints

| Method | Endpoint                        | Description                    |
| ------ | ------------------------------- | ------------------------------ |
| POST   | `/admin/login`                  | Admin login                    |
| POST   | `/add-category`                 | Create a category              |
| GET    | `/categories`                   | List all categories            |
| PUT    | `/edit-category/:id`            | Update a category              |
| POST   | `/add-product`                  | Create a product               |
| GET    | `/products/:categoryId`         | List products in a category    |
| PUT    | `/edit-product/:id`             | Update a product               |
| POST   | `/auth/user/register`           | Register a user                |
| POST   | `/auth/user/login`              | User login                     |
| POST   | `/add-to-cart`                  | Add an item to the cart        |
| GET    | `/cart-items/:userId`           | Cart items for a user          |
| PUT    | `/remove-from-cart`             | Remove an item from the cart   |
| GET    | `/populated-cart-items/:userId` | Cart items with product detail |

## Scripts

**Frontend** (`Blinkit-delivery-app-Frontend/Blinkit-clone-proj`)

| Command         | Description                        |
| --------------- | ---------------------------------- |
| `npm start`     | Dev server on port 4200            |
| `npm run build` | Production build to `dist/`        |
| `npm test`      | Karma + Jasmine unit tests         |

**Backend** (`blinkit-delivery-app-API/blinkit-clone-api`)

| Command       | Description                  |
| ------------- | ---------------------------- |
| `npm run dev` | Start API with nodemon       |

## License

ISC
