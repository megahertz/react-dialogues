import { Button, Footer, Toast } from 'react-dialogues';

export function ToastTypesSample() {
  return (
    <Footer align="left">
      <Button
        onClick={() => {
          Toast.info('Info');
        }}
      >
        Info
      </Button>
      <Button
        onClick={() => {
          Toast.success('Success');
        }}
      >
        Success
      </Button>
      <Button
        onClick={() => {
          Toast.warning('Warning');
        }}
      >
        Warning
      </Button>
      <Button
        onClick={() => {
          Toast.error('Error');
        }}
      >
        Error
      </Button>
    </Footer>
  );
}
