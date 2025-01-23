import { useEffect, useState } from 'react';
import {
  Button,
  dialogues,
  Footer,
  Toast,
  type RdController,
  type ThemeName,
} from 'react-dialogues';

export function ThemeSample() {
  const [toast, setToast] = useState<RdController>();

  function createThemeChanger(theme: ThemeName) {
    return () => {
      showTestToast();
      dialogues.config.theme = theme;
    };
  }

  function showTestToast() {
    if (toast) {
      return;
    }

    setToast(
      Toast.info({
        content: 'Toast test',
        duration: 0,
        onClose: () => setToast(undefined),
      }),
    );
  }

  useEffect(() => {
    showTestToast();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
