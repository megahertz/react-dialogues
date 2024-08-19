import { Button, Modal } from 'react-amodal';

export default function AmodalShowSample() {
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
