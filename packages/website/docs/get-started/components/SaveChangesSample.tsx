import { Button, Modal, Toast } from 'react-dialogues';

export function SaveChangesSample() {
  async function handleClick() {
    const [action] = await Modal.show({
      title: 'Unsaved Changes',
      content: 'You have unsaved changes. What would you like to do?',
      buttons: [
        'Cancel',
        <Button value="discard" type="secondary">
          Discard
        </Button>,
        <Button value="save">Save</Button>,
      ],
    });

    if (action === 'save') {
      Toast.success('Changes saved!');
    } else if (action === 'discard') {
      Toast.info('Changes discarded');
    } else {
      Toast.info('Action cancelled');
    }
  }

  return <Button onClick={handleClick}>Close Document</Button>;
}
