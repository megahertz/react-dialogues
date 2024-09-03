import { useEffect, useState } from 'react';
import {
  Button,
  dialogues,
  Footer,
  Notification,
  type RdItem,
  type ThemeName,
} from 'react-dialogues';

export function ThemeSample() {
  const [notification, setNotification] = useState<RdItem>();

  function createThemeChanger(theme: ThemeName) {
    return () => {
      showTestNotification();
      dialogues.config.theme = theme;
    };
  }

  function showTestNotification() {
    if (notification) {
      return;
    }

    setNotification(
      Notification.info({
        children: 'Notification test',
        duration: 0,
        onClose: () => setNotification(undefined),
      }),
    );
  }

  useEffect(() => {
    showTestNotification();
  }, []);

  return (
    <Footer align="left">
      <Button onClick={createThemeChanger('light')}>Light</Button>
      <Button onClick={createThemeChanger('dark')}>Dark</Button>
      <Button onClick={createThemeChanger('auto')}>Auto</Button>
      <Button onClick={createThemeChanger('none')}>None</Button>
    </Footer>
  );
}
