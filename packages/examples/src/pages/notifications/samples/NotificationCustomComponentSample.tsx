import type { MouseEvent } from 'react';
import {
  Body,
  Button,
  CancelButton,
  Footer,
  Header,
  Notification,
  type NotificationProps,
  OkButton,
} from 'react-dialogues';

export function NotificationCustomComponentSample() {
  return (
    <Button onClick={() => CustomNotification.show()}>
      Show custom notification
    </Button>
  );
}

function CustomNotification(props: NotificationProps) {
  function onShowAnotherClick(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    Notification.info({ children: 'Another notification' });
  }

  return (
    <Notification empty duration={0} {...props}>
      <Header>Custom Notification</Header>
      <Body>This is a custom notification</Body>
      <Footer>
        <CancelButton type="text" />
        <OkButton onClick={onShowAnotherClick}>
          Show another notification
        </OkButton>
      </Footer>
    </Notification>
  );
}

CustomNotification.show = (props?: NotificationProps) => {
  Notification.showCustom(CustomNotification, props);
};
