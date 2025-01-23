import { Button, Footer, Modal, ModalProps, OkButton } from 'react-dialogues';

export function ModalMultipleSample() {
  const buttons = [
    <Button type="text" onClick={() => Modal.destroyAll()}>
      Close All
    </Button>,
    <OkButton />,
  ];

  function showMultipleModals(
    props: ModalProps = {},
    count = 3,
    interval = 300,
  ) {
    let i = 0;
    const intervalId = setInterval(() => {
      i += 1;
      if (i >= count) {
        clearInterval(intervalId);
      }
      Modal.show('test modal content', {
        buttons,
        title: `Modal ${i}`,
        ...props,
      });
    }, interval);
  }

  return (
    <Footer align="left">
      <Button
        onClick={() => {
          showMultipleModals();
        }}
      >
        Simultaneously
      </Button>
      <Button
        onClick={() => {
          showMultipleModals({ buttons: undefined, closeOthers: true });
        }}
      >
        One at once
      </Button>
    </Footer>
  );
}
