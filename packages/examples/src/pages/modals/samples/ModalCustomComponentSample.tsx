import type { MouseEvent } from 'react';
import {
  Body,
  Button,
  CancelButton,
  Footer,
  Header,
  Modal,
  type ModalProps,
  Notification,
  OkButton,
} from 'react-dialogues';

export function ModalCustomComponentSample() {
  return <Button onClick={() => CustomModal.show()}>Show custom modal</Button>;
}

function CustomModal(props: ModalProps) {
  function onShowNotificationClick(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    Notification.info({ children: 'Notification' });
  }

  return (
    <Modal empty {...props}>
      <Header>Custom Modal</Header>
      <Body>This is a custom modal</Body>
      <Footer>
        <CancelButton type="secondary" />
        <OkButton onClick={onShowNotificationClick}>Show notification</OkButton>
      </Footer>
    </Modal>
  );
}

CustomModal.show = (props?: ModalProps) => {
  Modal.show({ ...props, component: CustomModal });
};
