import { Button, Modal, Footer } from 'react-dialogues';

export function ModalCenteredSample() {
  const content = 'This modal is vertically centered on the screen.';

  return (
    <Footer align="left">
      <Button
        onClick={() => {
          Modal.show({ title: 'Default Position', content });
        }}
      >
        Default
      </Button>
      <Button
        onClick={() => {
          Modal.show({ title: 'Centered Modal', content, centered: true });
        }}
      >
        Centered
      </Button>
    </Footer>
  );
}
