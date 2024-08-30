import { Button, Footer, Modal } from 'react-dialogues';

export function NotificationTypesSample() {
  const children = 'test modal content';
  return (
    <Footer align="left">
      <Button onClick={() => Modal.info({ children, title: 'Info' })}>
        Info
      </Button>
      <Button onClick={() => Modal.success({ children, title: 'Success' })}>
        Success
      </Button>
      <Button onClick={() => Modal.warning({ children, title: 'Warning' })}>
        Warning
      </Button>
      <Button onClick={() => Modal.error({ children, title: 'Error' })}>
        Error
      </Button>
    </Footer>
  );
}
