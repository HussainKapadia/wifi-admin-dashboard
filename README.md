This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```
wifi-admin-dashboard
├─ .prettierrc
├─ .sequelizerc
├─ database
│  ├─ config
│  │  ├─ config.js
│  │  └─ config.ts
│  ├─ connection.ts
│  ├─ migrations
│  │  ├─ 20250706183016-create-user.js
│  │  ├─ 20250716190000-create-network-infos.js
│  │  └─ 20250717190000-create-connected-devices.js
│  ├─ models
│  │  ├─ connectedDevice.ts
│  │  ├─ index.js
│  │  ├─ networkInfo.ts
│  │  └─ user.ts
│  └─ seeders
│     └─ 20250716193000-seed-network-info.js
├─ eslint.config.mjs
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
├─ src
│  ├─ app
│  │  ├─ api
│  │  │  ├─ dashboard
│  │  │  │  ├─ connected-devices
│  │  │  │  │  ├─ route.ts
│  │  │  │  │  └─ [id]
│  │  │  │  │     └─ route.ts
│  │  │  │  └─ network-info
│  │  │  │     └─ route.ts
│  │  │  └─ users
│  │  │     └─ auth
│  │  │        ├─ login
│  │  │        │  └─ route.ts
│  │  │        ├─ logout
│  │  │        │  └─ route.ts
│  │  │        └─ signup
│  │  │           └─ route.ts
│  │  ├─ auth
│  │  │  ├─ login
│  │  │  │  └─ page.tsx
│  │  │  └─ signup
│  │  │     └─ page.tsx
│  │  ├─ dashboard
│  │  │  ├─ home
│  │  │  │  ├─ NetworkInfoSection.tsx
│  │  │  │  └─ page.tsx
│  │  │  ├─ layout.tsx
│  │  │  ├─ page.tsx
│  │  │  └─ settings
│  │  │     └─ page.tsx
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  └─ utils
│  │     ├─ auth-middleware.ts
│  │     ├─ auth.ts
│  │     └─ jwt.ts
│  └─ components
│     ├─ auth
│     │  └─ InputField.tsx
│     ├─ Card.tsx
│     ├─ dashboard
│     │  └─ connected-devices
│     │     ├─ ConnectedDeviceForm.tsx
│     │     └─ ConnectedDevicesList.tsx
│     ├─ Header.tsx
│     ├─ settings
│     └─ Sidebar.tsx
├─ test_mysql2.js
└─ tsconfig.json

```