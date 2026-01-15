import { Button, Toast } from 'react-dialogues';

export function ToastDurationSample() {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Button
        onClick={() => {
          Toast.show({
            title: 'Quick Toast',
            content: 'This disappears in 2 seconds.',
            duration: 2000,
          });
        }}
      >
        2 seconds
      </Button>
      <Button
        onClick={() => {
          Toast.show({
            title: 'Default Toast',
            content: 'This disappears in 5 seconds (default).',
          });
        }}
      >
        5 seconds (default)
      </Button>
      <Button
        onClick={() => {
          Toast.show({
            title: 'Long Toast',
            content: 'This disappears in 10 seconds.',
            duration: 10000,
          });
        }}
      >
        10 seconds
      </Button>
      <Button
        onClick={() => {
          Toast.show({
            title: 'Persistent Toast',
            content: 'This toast stays until manually closed.',
            duration: 0,
          });
        }}
      >
        Persistent
      </Button>
    </div>
  );
}
