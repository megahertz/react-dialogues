import { useState } from 'react';
import {
  Body,
  Button,
  CancelButton,
  Footer,
  Header,
  Modal,
  Notification,
  TextField,
  useUiItem,
} from 'react-dialogues';

export function ModalCustomComponentSample() {
  return (
    <Footer align="left">
      <Button
        onClick={async () => {
          const result = await EditUserModal.show({
            user: {
              firstName: 'John',
              lastName: 'Doe',
              email: 'john.d@sample.com',
            },
          });

          if (result === 'cancel' || result === 'close') {
            Notification.warning({
              children: `User editing was cancelled: ${result}`,
            });
          } else {
            Notification.info({
              children: `User saved: ${JSON.stringify(result, null, 2)}`,
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
  const item = useUiItem();

  function onSaveClick() {
    return item.destroy({ ...user, firstName, lastName });
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
        <Button onClick={onSaveClick}>Save</Button>
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
