import { Button, Footer, Toast } from 'react-dialogues';

export function ToastTypesSample() {
  return (
    <Footer align="left">
      <Button
        onClick={() => {
          Toast.info({ children: 'Info' });
        }}
      >
        Info
      </Button>
      <Button
        onClick={() => {
          Toast.success({ children: 'Success' });
        }}
      >
        Success
      </Button>
      <Button
        onClick={() => {
          Toast.warning({ children: 'Warning' });
        }}
      >
        Warning
      </Button>
      <Button
        onClick={() => {
          Toast.error({ children: 'Error' });
        }}
      >
        Error
      </Button>
    </Footer>
  );
}
