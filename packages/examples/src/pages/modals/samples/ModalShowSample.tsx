import { Button, Modal } from 'react-dialogues';

export function ModalShowSample() {
  return (
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
  );
}
