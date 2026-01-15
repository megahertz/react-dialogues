import { Button, Modal, Toast } from 'react-dialogues';

export function ModalPromptSample() {
  const handleClick = async () => {
    const [action, value] = await Modal.prompt({
      title: 'Enter your name',
      label: 'Name',
      placeholder: 'John Doe',
    });

    if (action === 'ok') {
      Toast.info(`User entered: ${value}`);
    }
  };

  return <Button onClick={handleClick}>Show Prompt</Button>;
}
