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
│  │  │  │  ├─ page.tsx
│  │  │  │  └─ StatusCardsRow.tsx
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
│  ├─ components
│  │  ├─ auth
│  │  │  └─ InputField.tsx
│  │  ├─ Card.tsx
│  │  ├─ dashboard
│  │  │  ├─ connected-devices
│  │  │  │  ├─ ConnectedDeviceForm.tsx
│  │  │  │  └─ ConnectedDevicesList.tsx
│  │  │  ├─ network-info
│  │  │  │  ├─ NetworkInfoDisplay.tsx
│  │  │  │  └─ NetworkInfoForm.tsx
│  │  │  ├─ settings
│  │  │  │  ├─ AccountSettings.tsx
│  │  │  │  └─ SecuritySettings.tsx
│  │  │  └─ status
│  │  │     ├─ ConnectedDevicesCountCard.tsx
│  │  │     ├─ FirewallStatusCard.tsx
│  │  │     ├─ SSIDCard.tsx
│  │  │     └─ WifiStatusCard.tsx
│  │  ├─ Header.tsx
│  │  ├─ settings
│  │  ├─ Sidebar.tsx
│  │  └─ ToggleSwitch.tsx
│  └─ contexts
│     └─ SettingsContext.tsx
├─ test_mysql2.js
└─ tsconfig.json

```
