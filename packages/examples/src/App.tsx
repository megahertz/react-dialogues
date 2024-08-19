import { useEffect, useState } from 'react';
import { Button } from 'react-dialogues';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ModalPage from './pages/modals/ModalPage';
import OtherPage from './pages/other/OtherPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <h1>Hello World</h1>
      </div>
    ),
  },
  {
    path: 'modals',
    element: <ModalPage />,
  },
  {
    path: 'notifications',
    element: <div>Notifications</div>,
  },
  {
    path: 'other',
    element: <OtherPage />,
  },
]);

export default function App() {
  return (
    <>
      <nav className="menu">
        <a href="/modals">Modals</a>
        <a href="/notifications">Notifications</a>
        <a href="/other">Other</a>
        <ToggleTheme />
      </nav>
      <main className="content">
        <RouterProvider router={router} />
      </main>
    </>
  );
}

function ToggleTheme() {
  const [isDark, setIsDark] = useState(
    localStorage.dark
      ? localStorage.dark === 'true'
      : window.matchMedia?.('(prefers-color-scheme: dark)').matches,
  );

  useEffect(() => {
    console.log({
      isDark,
      dark: localStorage.dark,
      matches: window.matchMedia?.('(prefers-color-scheme: dark)').matches,
    });
    document.documentElement.setAttribute(
      'data-theme',
      isDark ? 'dark' : 'light',
    );
  }, [isDark]);

  function toggleTheme() {
    setIsDark((prev) => {
      localStorage.dark = !prev;
      return !prev;
    });
  }

  return (
    <Button className="toggle-theme" onClick={toggleTheme}>
      {isDark ? 'Light Theme' : 'Dark Theme'}
    </Button>
  );
}
