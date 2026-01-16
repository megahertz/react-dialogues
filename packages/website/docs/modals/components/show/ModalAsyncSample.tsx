import { Button, Modal, Toast } from 'react-dialogues';

export function ModalAsyncSample() {
  const handleClick = async () => {
    const [action] = await Modal.show({
      title: 'Async Example',
      content: 'Click OK or Cancel to see the result.',
      buttons: ['Cancel', 'OK'],
    });

    Toast.show(`You clicked: ${action}`, {
      type: action === 'ok' ? 'success' : 'info',
    });
  };

  return <Button onClick={handleClick}>Show Async Modal</Button>;
}
