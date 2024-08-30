import { Button, Footer, Notification } from 'react-dialogues';

export function NotificationTypesSample() {
  return (
    <Footer align="left">
      <Button onClick={() => Notification.info({ children: 'Info' })}>
        Info
      </Button>
      <Button onClick={() => Notification.success({ children: 'Success' })}>
        Success
      </Button>
      <Button onClick={() => Notification.warning({ children: 'Warning' })}>
        Warning
      </Button>
      <Button onClick={() => Notification.error({ children: 'Error' })}>
        Error
      </Button>
    </Footer>
  );
}
