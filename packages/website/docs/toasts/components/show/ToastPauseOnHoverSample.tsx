import { Button, Footer, Toast } from 'react-dialogues';

export function ToastPauseOnHoverSample() {
  return (
    <Footer align="left">
      <Button
        onClick={() => {
          Toast.show({
            title: 'Pause on Hover',
            content: 'Hover over this toast to pause the timer (default).',
            pauseOnHover: true,
          });
        }}
      >
        Pause on Hover
      </Button>
      <Button
        onClick={() => {
          Toast.show({
            title: 'No Pause',
            content: 'This toast ignores hover and keeps counting.',
            pauseOnHover: false,
          });
        }}
      >
        No Pause on Hover
      </Button>
    </Footer>
  );
}
