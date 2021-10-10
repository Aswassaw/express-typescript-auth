# Express Typescript Auth
Membuat sistem Authentication dan Authorization menggunakan Express dan Typescript.

## Teknologi yang digunakan
- express
- express-validator
- typescript
- bcrypt
- nodemailer
- crypto
- dotenv
- cors
- helmet
- jsonwebtoken
- sequelize
- chalk
- compression
- morgan
- concurrently

## Setup
- Clone this repository.
- Install dependencies with `npm i`.
- Setup .env
```
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_NAME=YOUR_DB_NAME
DB_USER=root
DB_PASSWORD=

EMAIL_USER=YOUR_GMAIL_USER
EMAIL_PASS=YOUR_GMAIL_PASS

JWT_SECRET=YOUR_JWT_SECRET
```
- Compile Typescript with `npm run ts-compile`.
- Run development mode with `npm run dev`.
