import { Button, Modal, Footer } from 'react-dialogues';

export function ModalSizesSample() {
  const content = (
    <div>
      <p>This modal demonstrates different size options.</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>
  );

  return (
    <Footer align="left">
      <Button
        onClick={() => {
          Modal.show({ title: 'Normal Size', content });
        }}
      >
        Normal
      </Button>
      <Button
        onClick={() => {
          Modal.show({ title: 'Large Size', content, size: 'large' });
        }}
      >
        Large
      </Button>
      <Button
        onClick={() => {
          Modal.show({ title: 'Fullscreen', content, size: 'full' });
        }}
      >
        Full
      </Button>
    </Footer>
  );
}
