import { useState } from 'react';
import {
  Body,
  Button,
  CancelButton,
  Footer,
  Header,
  Modal,
  Notification,
  OkButton,
  TextField,
  useRdController,
} from 'react-dialogues';

export function ModalCustomComponentSample() {
  return (
    <Footer align="left">
      <Button
        onClick={async () => {
          const [action, result] = await EditUserModal.show({
            user: {
              firstName: 'John',
              lastName: 'Doe',
              email: 'john.d@sample.com',
            },
          });

          if (action === 'save') {
            Notification.info({
              children: `User saved: ${JSON.stringify(result, null, 2)}`,
            });
          } else {
            Notification.warning({
              children: `User editing was cancelled: ${action}`,
            });
          }
        }}
      >
        Show custom modal
      </Button>
    </Footer>
  );
}

function EditUserModal({ user }: UserModalProps) {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const item = useRdController();

  function onSaveClick() {
    item.destroy('save', { ...user, firstName, lastName });
  }

  return (
    <Modal empty>
      <Header>Edit user {user.firstName}</Header>
      <Body>
        <TextField
          label="First name:"
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name"
          value={firstName}
        />
        <TextField
          label="Last name:"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        />
      </Body>
      <Footer>
        <CancelButton />
        <OkButton onClick={onSaveClick}>Save</OkButton>
      </Footer>
    </Modal>
  );
}

EditUserModal.show = (props: UserModalProps) => {
  return Modal.showCustom(EditUserModal, props);
};

interface User {
  email: string;
  firstName: string;
  lastName: string;
}

interface UserModalProps {
  user: User;
}
