import { useState } from 'react';
import {
  Button,
  Footer,
  Notification,
  NotificationProps,
  type RdController,
} from 'react-dialogues';

export function NotificationItemMethodsSample() {
  const [notification1, setNotification1] =
    useState<RdController<NotificationProps>>();
  const [notification2, setNotification2] =
    useState<RdController<NotificationProps>>();

  return (
    <>
      <Footer align="left">
        <Button
          onClick={() => {
            setNotification1(
              Notification.show({
                children: 'Notification 1',
                onClose: () => setNotification1(undefined),
              }),
            );
          }}
        >
          Show Notification 1
        </Button>
        <Button
          onClick={() => {
            setNotification2(
              Notification.show({
                children: 'Notification 2',
                role: 'status',
                onClose: () => setNotification2(undefined),
              }),
            );
          }}
        >
          Show Notification 2
        </Button>
      </Footer>
      <Footer align="left">
        <Button
          disabled={!notification1}
          onClick={() => {
            notification1?.destroy('apiClose');
          }}
        >
          Close Notification 1
        </Button>
        <Button
          disabled={!notification2}
          onClick={() => {
            notification2?.update({
              duration: 40000,
              children: 'Duration is set to 40 seconds.',
            });
          }}
        >
          Update Notification 2
        </Button>
        <Button
          disabled={!notification1 && !notification2}
          onClick={() => {
            Notification.destroyAll('apiClose');
          }}
        >
          Close All Notifications
        </Button>
      </Footer>
    </>
  );
}
