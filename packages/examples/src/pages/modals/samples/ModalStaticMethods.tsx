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
        loading={false}
        onClick={async () => {
          const [action, email] = await Modal.prompt({
            label: 'Enter email address:',
            placeholder: 'email@example.com',
            title: 'Modal.prompt Example',
          });

          Notification.show({
            children: `Email: ${email} (${action})`,
            type: action === 'ok' ? 'success' : 'warning',
          });
        }}
      >
        Show Prompt
      </Button>
    </Footer>
  );
}
