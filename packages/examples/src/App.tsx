import { useEffect, useState } from 'react';
import { Button } from 'react-dialogues';
import {
  createBrowserRouter,
  NavLink,
  Outlet,
  RouterProvider,
} from 'react-router-dom';
import ModalPage from './pages/modals/ModalPage';
import NotificationPage from './pages/notifications/NotificationPage';
import OtherPage from './pages/other/OtherPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <nav className="menu">
          <NavLink to="/modals">Modals</NavLink>
          <NavLink to="/notifications">Notifications</NavLink>
          <NavLink to="/other">Other</NavLink>
          <ToggleTheme />
        </nav>
        <main className="content">
          <Outlet />
        </main>
      </>
    ),
    children: [
      {
        path: 'modals',
        element: <ModalPage />,
      },
      {
        path: 'notifications',
        element: <NotificationPage />,
      },
      {
        path: 'other',
        element: <OtherPage />,
      },
      {
        path: '/',
        element: <h1>Examples</h1>,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

function ToggleTheme() {
  const [isDark, setIsDark] = useState(
    localStorage.dark
      ? localStorage.dark === 'true'
      : window.matchMedia?.('(prefers-color-scheme: dark)').matches,
  );

  useEffect(() => {
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
