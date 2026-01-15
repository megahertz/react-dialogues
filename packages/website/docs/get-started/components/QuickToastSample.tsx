import { Button, Toast } from 'react-dialogues';

export function QuickToastSample() {
  return (
    <Button
      onClick={() => {
        Toast.success('Operation completed successfully!');
      }}
    >
      Show Toast
    </Button>
  );
}
