import { Button, Footer, Modal } from 'react-dialogues';

export function ModalTypeSample() {
  return (
    <Footer align="left">
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
    </Footer>
  );
}
