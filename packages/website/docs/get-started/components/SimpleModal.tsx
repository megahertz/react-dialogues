import { Button, CancelButton } from 'react-amodal/src/src';
import Modal from 'react-amodal/src/modal/Modal';

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
