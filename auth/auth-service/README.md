# Express API Starter with Typescript

A JavaScript Express v5 starter template with sensible defaults.

Sample API calls:

```
curl -X POST http://localhost:3011/api/auth/register-tenant \
  -H "Content-Type: application/json" \
  -d '{"tenantName": "Acme Corp"}'

# output:
{"tenantId":"670787fe-7f6d-4489-9fde-259dca0dc25c"}
```

```
curl -X POST http://localhost:3011/api/auth/register-user \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane.doe@example.com",
    "password": "strongPassword123",
    "tenantId": "670787fe-7f6d-4489-9fde-259dca0dc25c"
  }'
# output:
{"userId":"e8006410-98ab-49b3-a1d0-c5542644d58d"}
```

```
curl -X POST http://localhost:3011/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane.doe@example.com",
    "password": "strongPassword123"
  }
# output:
{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlODAwNjQxMC05OGFiLTQ5YjMtYTFkMC1jNTU0MjY0NGQ1OGQiLCJ0ZW5hbnRJZCI6IjY3MDc4N2ZlLTdmNmQtNDQ4OS05ZmRlLTI1OWRjYTBkYzI1YyIsImlhdCI6MTc1Mjg0NjU5MiwiZXhwIjoxNzUyODUwMTkyfQ.FmW8rS2vVGu3U-2Lig7RRKBw6b5iCwUZDC9s6QPwMz4","user":{"email":"jane.doe@example.com","tenantName":"Acme Corp"}}
```

How to use this template:

```sh
pnpm dlx create-express-api@latest --typescript --directory my-api-name
```

Includes API Server utilities:

- [morgan](https://www.npmjs.com/package/morgan)
  - HTTP request logger middleware for node.js
- [helmet](https://www.npmjs.com/package/helmet)
  - Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
- [cors](https://www.npmjs.com/package/cors)
  - CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

Development utilities:

- [typescript](https://www.npmjs.com/package/typescript)
  - TypeScript is a language for application-scale JavaScript.
- [tsx](https://www.npmjs.com/package/tsx)
  - The easiest way to run TypeScript in Node.js
- [eslint](https://www.npmjs.com/package/eslint)
  - ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- [vitest](https://www.npmjs.com/package/vitest)
  - Next generation testing framework powered by Vite.
- [zod](https://www.npmjs.com/package/zod)
  - Validated TypeSafe env with zod schema
- [supertest](https://www.npmjs.com/package/supertest)
  - HTTP assertions made easy via superagent.

## Setup

```
pnpm install
```

## Lint

```
pnpm run lint
```

## Test

```
pnpm run test
```

## Development

```
pnpm run dev
```
