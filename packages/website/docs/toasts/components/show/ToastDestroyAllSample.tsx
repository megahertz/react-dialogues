import { Button, Toast } from 'react-dialogues';

export function ToastDestroyAllSample() {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Button
        onClick={() => {
          Toast.show({ title: 'Toast 1', content: 'First toast' });
          Toast.show({ title: 'Toast 2', content: 'Second toast' });
          Toast.show({ title: 'Toast 3', content: 'Third toast' });
        }}
      >
        Show 3 Toasts
      </Button>
      <Button
        color="error"
        onClick={() => {
          Toast.destroyAll();
        }}
      >
        Destroy All
      </Button>
    </div>
  );
}
