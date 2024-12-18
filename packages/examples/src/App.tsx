import { useEffect, useState } from 'react';
import { Button, Notification } from 'react-dialogues';
import {
  createBrowserRouter,
  NavLink,
  Outlet,
  RouterProvider,
  useLocation,
} from 'react-router-dom';
import ModalPage from './pages/modals/ModalPage';
import { ModalCustomComponentSample } from './pages/modals/samples/ModalCustomComponentSample';
import { ModalMultipleSample } from './pages/modals/samples/ModalMultipleSample';
import { ModalNotificationTypesSample } from './pages/modals/samples/ModalNotificationTypesSample';
import { ModalStaticMethods } from './pages/modals/samples/ModalStaticMethods';
import { ModalSizesAndPositionSample } from './pages/modals/samples/ModalSizesAndPositionSample';
import NotificationPage from './pages/notifications/NotificationPage';
import { NotificationCustomComponentSample } from './pages/notifications/samples/NotificationCustomComponentSample';
import { NotificationItemMethodsSample } from './pages/notifications/samples/NotificationItemMethodsSample';
import { NotificationShowSample } from './pages/notifications/samples/NotificationShowSample';
import { NotificationTypesSample } from './pages/notifications/samples/NotificationTypesSample';
import OtherPage from './pages/other/OtherPage';
import { ButtonsSample } from './pages/other/samples/ButtonsSample';
import { SpinnersSample } from './pages/other/samples/SpinnersSample';
import { ThemeSample } from './pages/other/samples/ThemeSample';
import PopoverPage from './pages/popover/PopoverPage';
import { ChildTypesSample } from './pages/popover/samples/ChildTypesSample';
import { PlacementSample } from './pages/popover/samples/PlacementSample';
import { PopoverSample } from './pages/popover/samples/PopoverSample';
import { ScrollSample } from './pages/popover/samples/ScrollSample';
import { TooltipSample } from './pages/popover/samples/TooltipSample';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <NotificationController />
        <nav className="menu">
          <NavLink to="/modals">Modals</NavLink>
          <NavLink to="/notifications">Notifications</NavLink>
          <NavLink to="/popovers">Popovers</NavLink>
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
        path: 'modals/ModalCustomComponentSample',
        element: <ModalCustomComponentSample />,
      },
      {
        path: 'modals/ModalMultipleSample',
        element: <ModalMultipleSample />,
      },
      {
        path: 'modals/ModalNotificationTypesSample',
        element: <ModalNotificationTypesSample />,
      },
      {
        path: 'modals/ModalSizesAndPositionSample',
        element: <ModalSizesAndPositionSample />,
      },
      {
        path: 'modals/ModalStaticMethods',
        element: <ModalStaticMethods />,
      },

      {
        path: 'notifications',
        element: <NotificationPage />,
      },
      {
        path: 'notifications/NotificationCustomComponentSample',
        element: <NotificationCustomComponentSample />,
      },
      {
        path: 'notifications/NotificationItemMethodsSample',
        element: <NotificationItemMethodsSample />,
      },
      {
        path: 'notifications/NotificationShowSample',
        element: <NotificationShowSample />,
      },
      {
        path: 'notifications/NotificationTypesSample',
        element: <NotificationTypesSample />,
      },

      {
        path: 'popovers',
        element: <PopoverPage />,
      },
      {
        path: 'popover/ChildTypesSample',
        element: <ChildTypesSample />,
      },
      {
        path: 'popover/PlacementSample',
        element: <PlacementSample />,
      },
      {
        path: 'popover/ScrollSample',
        element: <ScrollSample />,
      },
      {
        path: 'popover/PopoverSample',
        element: <PopoverSample />,
      },
      {
        path: 'popover/TooltipSample',
        element: <TooltipSample />,
      },

      {
        path: 'other',
        element: <OtherPage />,
      },
      {
        path: 'other/ButtonsSample',
        element: <ButtonsSample />,
      },
      {
        path: 'other/SpinnersSample',
        element: <SpinnersSample />,
      },
      {
        path: 'other/ThemeSample',
        element: <ThemeSample />,
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

function NotificationController() {
  const location = useLocation();
  useEffect(() => Notification.destroyAll(), [location]);
  return null;
}
