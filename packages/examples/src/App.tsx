import { useEffect, useState } from 'react';
import { Button, Toast } from 'react-dialogues';
import { Link, Router, Route, Switch, useLocation } from 'wouter';
import ModalPage from './pages/modals/ModalPage';
import { ModalCustomComponentSample } from './pages/modals/samples/ModalCustomComponentSample';
import { ModalMultipleSample } from './pages/modals/samples/ModalMultipleSample';
import { ModalNotificationTypesSample } from './pages/modals/samples/ModalNotificationTypesSample';
import { ModalStaticMethods } from './pages/modals/samples/ModalStaticMethods';
import { ModalSizesAndPositionSample } from './pages/modals/samples/ModalSizesAndPositionSample';
import ToastPage from './pages/toasts/ToastPage';
import { ToastCustomComponentSample } from './pages/toasts/samples/ToastCustomComponentSample';
import { ToastItemMethodsSample } from './pages/toasts/samples/ToastItemMethodsSample';
import { ToastShowSample } from './pages/toasts/samples/ToastShowSample';
import { ToastTypesSample } from './pages/toasts/samples/ToastTypesSample';
import OtherPage from './pages/other/OtherPage';
import { ButtonsSample } from './pages/other/samples/ButtonsSample';
import { SpinnersSample } from './pages/other/samples/SpinnersSample';
import { ThemeSample } from './pages/other/samples/ThemeSample';
import PopoverPage from './pages/popovers/PopoverPage';
import { ChildTypesSample } from './pages/popovers/samples/ChildTypesSample';
import { PlacementSample } from './pages/popovers/samples/PlacementSample';
import { PopoverSample } from './pages/popovers/samples/PopoverSample';
import { ScrollSample } from './pages/popovers/samples/ScrollSample';
import { TooltipSample } from './pages/popovers/samples/TooltipSample';

export default function App() {
  return (
    <Router>
      <NotificationController />
      <nav className="menu test-hidden">
        <Link to="/modals">Modals</Link>
        <Link to="/toasts">Toasts</Link>
        <Link to="/popovers">Popovers</Link>
        <Link to="/other">Other</Link>
        <ToggleTheme />
      </nav>
      <main className="content">
        <Route path="modals" nest>
          <Switch>
            <Route
              path="ModalCustomComponentSample"
              component={ModalCustomComponentSample}
            />
            <Route path="ModalMultipleSample" component={ModalMultipleSample} />
            <Route
              path="ModalNotificationTypesSample"
              component={ModalNotificationTypesSample}
            />
            <Route
              path="ModalSizesAndPositionSample"
              component={ModalSizesAndPositionSample}
            />
            <Route path="ModalStaticMethods" component={ModalStaticMethods} />
            <Route component={ModalPage} />
          </Switch>
        </Route>
        <Route path="other" nest>
          <Switch>
            <Route path="ButtonsSample" component={ButtonsSample} />
            <Route path="SpinnersSample" component={SpinnersSample} />
            <Route path="ThemeSample" component={ThemeSample} />
            <Route component={OtherPage} />
          </Switch>
        </Route>
        <Route path="popovers" nest>
          <Switch>
            <Route path="ChildTypesSample" component={ChildTypesSample} />
            <Route path="PlacementSample" component={PlacementSample} />
            <Route path="PopoverSample" component={PopoverSample} />
            <Route path="ScrollSample" component={ScrollSample} />
            <Route path="TooltipSample" component={TooltipSample} />
            <Route component={PopoverPage} />
          </Switch>
        </Route>
        <Route path="toasts" nest>
          <Switch>
            <Route
              path="ToastCustomComponentSample"
              component={ToastCustomComponentSample}
            />
            <Route
              path="ToastItemMethodsSample"
              component={ToastItemMethodsSample}
            />
            <Route path="ToastShowSample" component={ToastShowSample} />
            <Route path="ToastTypesSample" component={ToastTypesSample} />
            <Route component={ToastPage} />
          </Switch>
        </Route>
      </main>
      <Route />
    </Router>
  );
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
  const [location] = useLocation();
  useEffect(() => Toast.destroyAll(), [location]);
  return null;
}
