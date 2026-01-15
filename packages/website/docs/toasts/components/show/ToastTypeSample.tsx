import { Button, Toast } from 'react-dialogues';

export function ToastTypeSample() {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Button
        onClick={() => {
          Toast.info({ title: 'Info', content: 'This is an info toast.' });
        }}
      >
        Info
      </Button>
      <Button
        color="success"
        onClick={() => {
          Toast.success({ title: 'Success', content: 'Operation completed!' });
        }}
      >
        Success
      </Button>
      <Button
        color="warning"
        onClick={() => {
          Toast.warning({ title: 'Warning', content: 'Please be careful.' });
        }}
      >
        Warning
      </Button>
      <Button
        color="error"
        onClick={() => {
          Toast.error({ title: 'Error', content: 'Something went wrong.' });
        }}
      >
        Error
      </Button>
    </div>
  );
}
