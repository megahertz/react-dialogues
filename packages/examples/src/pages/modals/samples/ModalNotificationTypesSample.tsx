import { Button, Footer, Modal } from 'react-dialogues';

export function ModalNotificationTypesSample() {
  const content = 'test modal content';
  return (
    <Footer align="left">
      <Button
        onClick={() => {
          Modal.info({ content, title: 'Info' });
        }}
      >
        Info
      </Button>
      <Button
        onClick={() => {
          Modal.success({ content, title: 'Success' });
        }}
      >
        Success
      </Button>
      <Button
        onClick={() => {
          Modal.warning({ content, title: 'Warning' });
        }}
      >
        Warning
      </Button>
      <Button
        onClick={() => {
          Modal.error({ content, title: 'Error' });
        }}
      >
        Error
      </Button>
    </Footer>
  );
}
