import {
  Button,
  dialogues,
  Footer,
  Toast,
  type ThemeName,
} from 'react-dialogues';

export function ThemeSample() {
  function setTheme(theme: ThemeName) {
    dialogues.config.theme = theme;
    Toast.info(`Theme set to "${theme}"`);
  }

  return (
    <Footer align="left">
      <Button onClick={() => setTheme('light')}>Light</Button>
      <Button onClick={() => setTheme('dark')}>Dark</Button>
      <Button onClick={() => setTheme('auto')}>Auto</Button>
      <Button onClick={() => setTheme('none')}>None</Button>
    </Footer>
  );
}
