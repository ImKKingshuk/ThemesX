<h1 align="center">ThemesX</h1>

<p align="center">
ThemesX: Your All-in-One Dark Mode Solution for React Apps! Effortlessly integrate light, dark, and system themes with full support for Next.js, React, Vite, Gatsby, Remix, Astro, Qwik, Solid, and more. ThemesX simplifies theme switching with responsive support for system theme preferences. 🌗🎨
</p>

<br> <br>

## Features

- **Seamless Dark Mode Support**: ThemesX provides a quick setup for dark and light modes, handling background, text colors, and system theme detection automatically.
- **System Theme Detection**: Automatically syncs with the user’s device theme preference, so your app can adjust its appearance according to the system's light or dark mode setting.
- **React Ecosystem Compatibility**: Works effortlessly with major frameworks like Next.js, Vite, Gatsby, Remix, Astro, Qwik, and Solid, ensuring broad compatibility for any React-based project.
- **SSR Friendly**: Fully compatible with server-side rendering, making it ideal for Next.js and other SSR frameworks.
- **Dynamic Theme Switching**: Includes options for system-based, user-selected dark or light themes, making it highly customizable.
- **Embedded CSS Styling**: Automatically injects the necessary CSS for background and text color adjustments, saving you from adding extra styling code.
- **TypeScript Support**: Fully typed with TypeScript, enabling improved development experience, code completion, and safety.

## Installation

Install `ThemesX` using your preferred package manager:

### Bun

```bash
bun add themesx
```

### npm

```bash
npm install themesx
```

### pnpm

```bash
pnpm add themesx
```

### yarn

```bash
yarn add themesx
```

## API Reference

### `ThemeProvider`

The `ThemeProvider` component wraps your application to provide global theme state and CSS support.

| Prop                | Type                                | Default    | Description                                   |
| ------------------- | ----------------------------------- | ---------- | --------------------------------------------- |
| `children`          | `ReactNode`                         | —          | Components wrapped inside the provider.       |
| `defaultTheme`      | `'light'` \| `'dark'` \| `'system'` | `'system'` | Initial theme.                                |
| `enableSystemTheme` | `boolean`                           | `true`     | Automatically adapts to system theme changes. |

### `useTheme`

A hook to access and control the theme state. Use `useTheme` to set and toggle themes in any component.

```typescript
const { theme, setTheme } = useTheme();
```

- **`theme`**: The current theme (`"light"`, `"dark"`, or `"system"`).
- **`setTheme`**: Function to change the theme; accepts `"light"`, `"dark"`, or `"system"` as parameters.

## Usage

### Basic Setup

In your main app file, wrap your app in `ThemeProvider` to enable ThemesX functionality.

```jsx
import React from 'react';
import { ThemeProvider } from 'themesx';

function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default App;
```

### Accessing the Theme Context

Use the `useTheme` hook to control and monitor theme state in your components.

```jsx
import React from 'react';
import { useTheme } from 'themesx';

const MyComponent = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme('dark')}>Switch to Dark Mode</button>
      <button onClick={() => setTheme('light')}>Switch to Light Mode</button>
      <button onClick={() => setTheme('system')}>Use System Theme</button>
    </div>
  );
};

export default MyComponent;
```

---

## Framework-Specific Examples

### Next.js

#### App Directory (Next.js 13+)

In the `app` directory, place `ThemeProvider` in `layout.js` or `layout.tsx` to ensure theme support for all pages.

```jsx
// app/layout.js or app/layout.tsx
import React from 'react';
import { ThemeProvider } from 'themesx';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

#### Pages Directory

In the `pages` directory, add `ThemeProvider` to `_app.js` or `_app.tsx` to wrap all pages with theme support.

```jsx
// pages/_app.js or pages/_app.tsx
import React from 'react';
import { ThemeProvider } from 'themesx';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
```

### Vite

For Vite projects, simply wrap your main application component in `ThemeProvider` in `main.js` or `main.tsx`.

```jsx
// src/main.js or src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'themesx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
);
```

### Gatsby

To use ThemesX in a Gatsby project, add `ThemeProvider` in `gatsby-browser.js` and `gatsby-ssr.js` to enable SSR and client-side support.

```jsx
// gatsby-browser.js and gatsby-ssr.js
import React from 'react';
import { ThemeProvider } from 'themesx';

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
);
```

### Remix

In Remix, wrap your `root` component in `ThemeProvider` to ensure theme support throughout the app.

```jsx
// root.tsx or root.js
import React from 'react';
import { ThemeProvider } from 'themesx';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'remix';

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider>
          <Outlet />
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
```

### Astro

Astro with React components can use `ThemeProvider` by wrapping your app in the main `App` file.

```jsx
// src/components/App.jsx
import React from 'react';
import { ThemeProvider } from 'themesx';
import MyComponent from './MyComponent';

const App = () => (
  <ThemeProvider>
    <MyComponent />
  </ThemeProvider>
);

export default App;
```

### Qwik

In a Qwik React project, you can wrap the main component in `ThemeProvider` as shown below.

```jsx
// src/App.jsx
import React from 'react';
import { ThemeProvider } from 'themesx';
import MyComponent from './MyComponent';

const App = () => (
  <ThemeProvider>
    <MyComponent />
  </ThemeProvider>
);

export default App;
```

### Solid

Using ThemesX in Solid requires wrapping the main React component in `ThemeProvider`.

```jsx
// src/App.jsx
import React from 'react';
import { ThemeProvider } from 'themesx';
import MyComponent from './MyComponent';

const App = () => (
  <ThemeProvider>
    <MyComponent />
  </ThemeProvider>
);

export default App;
```

## License

This project is licensed under the GPL-3.0-or-later License.
