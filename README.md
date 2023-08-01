# Build a SaaS AI Companion 

- This is a repository for Build a SaaS AI Platform with Next.js 13, React, Tailwind, Prisma, Stripe 
- the ai companions - we can add some popular figures/celebrities or ourselve and then give some details about them and feed some extra information like which categories they belong and what sorta conversations they gon have when they interact with the human.
- this add/remove the companion will be only possible if the user has already subcribed to our app.
- start the next app - `npx create-next-app@lates app-name --tailwindcss --eslint --typescript` and select the app routing 


### Dependencies 

- shadcn `npx shadcn-ui@latest init` style defaul, neutral
  - `npx shadcn-ui@latest add button dropdown-menu sheet input form textarea separator select toast card avatar dialog`
  - for  the dark mode, we ve to install the package, next/theme.. `npm i next/themes@latest` 
  - then follow the shadcn doc to create the "theme-provider.tsx" , then wrap our root layout with this theme provider comp.
  - then copy the theme-toggle from shadcn doc, and put em in the components/ui - (mode-toggle.tsx)
- clerk `npm i @clerk/nextjs` for the auth - this supports the app router and the page based router, and we can wrap our app with the clerk provider, and create a mw (default auth mw) as mentioned in the documentation.
- `npm i query-string` for stiringify the query parameters
- `npm i -D prisma` for the orm mapping, 
  - then `npx prisma iinit` to init the schema, and our db provider is mysql from **planetscale**
  - `npx prisma generate` to generate the schema.
  - `npx prisma db push` to push the schema/changes to planet scale/ db
  - `npx prisma studio` to run the prisma client/local studio, then we can run our seed.ts -> `node scripts/seed.ts`
  - `npm i react-hook-form` to handle the form data (useForm)
  - for cloudinary `npm i next-cloudinary` 
  - axios `npx i axios`
- `npm i ai ` a package from versel, The Vercel AI SDK is a library for building AI-powered streaming text and chat UIs
- `npm i react-spinners` for the loading animations
- `npm i pinecone-database/pinecone` is a vector db which we re gon to use to create embeddics in order to make an advanced ai model.
- `npm i @upstash/redis` the redis db, we re gon to use for long term memory
- `npm i @upstash/ratelimit` so no users can spam our ai model more that they should
- `npm i langchain` 
- `npm i dotenv` for the env variables
- `npm i replicate` the replicate ai model.
- `npm i openai` open ai for the chat (promt)
- `npm i openai-edge`
- `npm i stripe` for the payment integration
- `npm i zustand` state mgmt for open and close our modals,  // make suer it matches our dynamic route - [companionId] from api

Features:

- Tailwind design
- Tailwind animations and effects
- Full responsiveness
- Clerk Authentication (Email, Google, 9+ Social Logins)
- Client form validation and handling using react-hook-form
- Server error handling using react-toast
- Image Generation Tool (Open AI)
- Video Generation Tool (Replicate AI)
- Conversation Generation Tool (Open AI)
- Music Generation Tool (Replicate AI)
- Page loading state
- Stripe monthly subscription
- Free tier with API limiting
- How to write POST, DELETE, and GET routes in route handlers (app/api)
- How to fetch data in server react components by directly accessing database (WITHOUT API! like Magic!)
- How to handle relations between Server and Child components!
- How to reuse layouts
- Folder structure in Next 13 App Router

### Prerequisites

**Node version 18.x.x**



### Install packages

```shell
npm i
```

### Setup .env file


```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

OPENAI_API_KEY=
REPLICATE_API_TOKEN=

PINECONE_API_KEY=
PINECONE_ENVIRONMENT=
PINECONE_INDEX=

UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=

DATABASE_URL=

STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=

NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Setup Prisma

Add MySQL Database (I used PlanetScale)

```shell
npx prisma db push

```

Seed categories:
```shell
node scripts/seed.ts
```

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `dev`           | Starts a development instance of the app |


### Deployment 

- the app is deployed in the versel and [deployed url is here](https://ai-companion-seven.vercel.app)
