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

| Variable      | Description                                                        |
| ------------- | ------------------------------------------------------------------ |
| `MONGODB_URI` | MongoDB connection string (required)                               |
| `PORT`        | Port to listen on. Defaults to `3000`; hosts set this themselves.  |
| `CORS_ORIGIN` | Allowed browser origin(s), comma-separated. Defaults to `*`.       |

> `.env` is git-ignored — never commit real credentials.

### 2. Frontend

```bash
cd Blinkit-delivery-app-Frontend/Blinkit-clone-proj
npm install
npm start                 # ng serve
```

The app is served on **http://localhost:4200** and expects the API at `http://localhost:3000`.

The API base URL is not hardcoded in the services - it comes from the environment files:

| File                               | Used by                        | Value                       |
| ---------------------------------- | ------------------------------ | --------------------------- |
| `src/environments/environment.ts`      | `ng serve` / dev build     | `http://localhost:3000/`    |
| `src/environments/environment.prod.ts` | `ng build` (production)    | your deployed API URL       |

> Update `apiUrl` in `environment.prod.ts` to point at your deployed API. It must end with a trailing slash.

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

| Command       | Description                        |
| ------------- | ---------------------------------- |
| `npm start`   | Start API (production)             |
| `npm run dev` | Start API with nodemon (development) |

## Deployment

The frontend and backend deploy as two separate services. Deploy the **API first** so you
know its URL, then point the frontend at it.

### 1. Database - MongoDB Atlas

1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Under **Network Access**, allow `0.0.0.0/0` so your host can reach the cluster.
3. Under **Database Access**, create a user and copy the connection string.

### 2. API - Render

The repo includes [`render.yaml`](render.yaml), so Render can configure the service for you.

1. On [render.com](https://render.com), pick **New > Blueprint** and select this repo.
2. Render reads `render.yaml` and creates the `blinkit-clone-api` web service.
3. Add the environment variables when prompted:
   - `MONGODB_URI` - your Atlas connection string
   - `CORS_ORIGIN` - leave as `*` for now; set it to your frontend URL after step 3
4. Deploy, then confirm `https://<your-api>.onrender.com/health` returns `{"status":"ok"}`.

To set it up manually instead: **New > Web Service**, root directory
`blinkit-delivery-app-API/blinkit-clone-api`, build `npm ci`, start `npm start`.

> On Render's free tier the service sleeps after inactivity, so the first request
> after an idle period takes ~30-60s to respond.

### 3. Frontend - Netlify

The repo includes [`netlify.toml`](netlify.toml) with the build settings and the SPA redirect.

1. Edit `src/environments/environment.prod.ts` and set `apiUrl` to your Render URL
   (with a trailing slash), then commit and push.
2. On [netlify.com](https://netlify.com), choose **Add new site > Import an existing project**
   and select this repo. Netlify picks up `netlify.toml` automatically.
3. Deploy, then copy the site URL.

### 4. Close the loop on CORS

Back in Render, set `CORS_ORIGIN` to your Netlify URL (no trailing slash) and redeploy:

```
CORS_ORIGIN=https://your-site.netlify.app
```

This stops other sites from calling your API from the browser.

### Deployment checklist

- [ ] Atlas cluster created, network access allows your host
- [ ] API deployed, `/health` returns `{"status":"ok","db":"connected"}`
- [ ] `environment.prod.ts` points at the deployed API (trailing slash)
- [ ] Frontend deployed and loading categories
- [ ] `CORS_ORIGIN` set to the frontend URL
- [ ] `.env` never committed

## License

ISC
