# E-Commerce Platform (MVP)

## Tech Stack
- Next.js (App Router)
- Express API Gateway
- Prisma + PostgreSQL
- JWT Authentication
- Role-based Admin/User
- Order Management System

## Features
- User authentication
- Admin dashboard
- Product management
- Order lifecycle management
- Cart functionality
- Image upload support

## Setup

1. Install dependencies:
pnpm install

2. Setup environment variables:
Create .env file

3. Run Prisma:
pnpm prisma migrate dev

4. backend:
pnpm --filter @apps/api-gateway dev
>>
5. frontendend:
>>pnpm --filter web dev

