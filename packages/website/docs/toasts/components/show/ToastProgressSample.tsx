import { Button, Toast } from 'react-dialogues';

export function ToastProgressSample() {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Button
        onClick={() => {
          Toast.show({
            title: 'With Progress',
            content: 'Progress bar is visible (default).',
            showProgress: true,
          });
        }}
      >
        With Progress
      </Button>
      <Button
        onClick={() => {
          Toast.show({
            title: 'No Progress',
            content: 'Progress bar is hidden.',
            showProgress: false,
          });
        }}
      >
        Without Progress
      </Button>
    </div>
  );
}
