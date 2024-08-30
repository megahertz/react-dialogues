import { Button, Footer, Notification } from 'react-dialogues';

export function NotificationShowSample() {
  return (
    <>
      <Footer align="left">
        <Button
          onClick={async () => {
            Notification.show({
              children: 'placement: topLeft',
              placement: 'topLeft',
            });
          }}
        >
          Top left
        </Button>
        <Button
          onClick={() => {
            Notification.show({
              children: 'placement: top',
              placement: 'top',
            });
          }}
        >
          Top
        </Button>
        <Button
          onClick={() => {
            Notification.show({
              children: 'placement: topRight',
              placement: 'topRight',
            });
          }}
        >
          Top right
        </Button>
      </Footer>
      <Footer align="left">
        <Button
          onClick={() => {
            Notification.show({
              children: 'placement: bottomLeft',
              placement: 'bottomLeft',
            });
          }}
        >
          Bottom left
        </Button>
        <Button
          onClick={() => {
            Notification.show({
              children: 'placement: bottom',
              placement: 'bottom',
            });
          }}
        >
          Bottom
        </Button>
        <Button
          onClick={() => {
            Notification.show({
              children: 'placement: bottomRight',
              placement: 'bottomRight',
            });
          }}
        >
          Bottom right
        </Button>
      </Footer>
    </>
  );
}
