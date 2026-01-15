import { Button, Toast } from 'react-dialogues';

export function BasicToastSample() {
  return (
    <Button
      onClick={() => {
        Toast.show('Hello! This is a basic toast notification.', {
          title: 'Basic Toast',
        });
      }}
    >
      Show Basic Toast
    </Button>
  );
}
