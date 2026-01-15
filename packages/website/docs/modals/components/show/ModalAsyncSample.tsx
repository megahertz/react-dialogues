import { Button, Modal, Toast, OkButton, CancelButton } from 'react-dialogues';

export function ModalAsyncSample() {
  const handleClick = async () => {
    const [action] = await Modal.show({
      title: 'Async Example',
      content: 'Click OK or Cancel to see the result.',
      buttons: [<CancelButton key="cancel" />, <OkButton key="ok" />],
    });

    Toast.show(`You clicked: ${action}`, {
      type: action === 'ok' ? 'success' : 'info',
    });
  };

  return <Button onClick={handleClick}>Show Async Modal</Button>;
}
