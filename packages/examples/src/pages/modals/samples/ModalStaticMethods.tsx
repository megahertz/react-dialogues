import { Button, Footer, Modal, Notification } from 'react-dialogues';

export function ModalStaticMethods() {
  return (
    <Footer align="left">
      <Button
        onClick={() => {
          Modal.show({
            title: 'Modal.show Example',
            children: 'test modal content',
          });
        }}
      >
        Show Modal
      </Button>
      <Button
        onClick={async () => {
          const email = await Modal.prompt({
            label: 'Enter email address:',
            placeholder: 'email@example.com',
            title: 'Modal.prompt Example',
          });

          Notification.info({ children: `Email: ${email}` });
        }}
      >
        Show Prompt
      </Button>
    </Footer>
  );
}
