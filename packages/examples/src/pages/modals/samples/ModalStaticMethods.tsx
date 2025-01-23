import { Button, Footer, Modal, Toast } from 'react-dialogues';

export function ModalStaticMethods() {
  return (
    <Footer align="left">
      <Button
        onClick={() => {
          Modal.show('test modal content', { title: 'Modal.show Example' });
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

          Toast.show(`Email: ${email} (${action})`, {
            type: action === 'ok' ? 'success' : 'warning',
          });
        }}
      >
        Show Prompt
      </Button>
    </Footer>
  );
}
