import { Button, Modal } from 'react-dialogues';

export function ModalTypeSample() {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Button
        onClick={() => {
          Modal.info({ title: 'Info', content: 'This is an info modal.' });
        }}
      >
        Info
      </Button>
      <Button
        color="success"
        onClick={() => {
          Modal.success({ title: 'Success', content: 'Operation completed!' });
        }}
      >
        Success
      </Button>
      <Button
        color="warning"
        onClick={() => {
          Modal.warning({ title: 'Warning', content: 'Please be careful.' });
        }}
      >
        Warning
      </Button>
      <Button
        color="error"
        onClick={() => {
          Modal.error({ title: 'Error', content: 'Something went wrong.' });
        }}
      >
        Error
      </Button>
    </div>
  );
}
