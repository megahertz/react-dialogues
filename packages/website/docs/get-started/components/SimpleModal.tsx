import { Button, CancelButton } from 'react-dialogues/src/src';
import Modal from 'react-dialogues/src/modal/Modal';

export default function SimpleModal() {
  return (
    <Modal
      title="Test"
      buttons={[
        <CancelButton>Cancel</CancelButton>,
        // eslint-disable-next-line no-console
        <Button onClick={() => console.log('ok')}>OK</Button>,
      ]}
    >
      Body
    </Modal>
  );
}
