import { Button, Toast, useRdController } from 'react-dialogues';
import { useState } from 'react';

function CustomProgressToast() {
  const controller = useRdController();
  const [progress, setProgress] = useState(0);

  const handleStart = () => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          controller.destroy('complete');
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <Toast title="Custom Toast" showProgress={false} duration={0}>
      <div>
        <p>Progress: {progress}%</p>
        <div
          style={{
            width: '100%',
            height: '8px',
            backgroundColor: '#e5e7eb',
            borderRadius: '4px',
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              backgroundColor: '#3b82f6',
              borderRadius: '4px',
              transition: 'width 0.2s',
            }}
          />
        </div>
        <Button onClick={handleStart} style={{ marginTop: '8px' }}>
          Start
        </Button>
      </div>
    </Toast>
  );
}

export function ToastShowCustomSample() {
  return (
    <Button
      onClick={() => {
        Toast.showCustom(CustomProgressToast);
      }}
    >
      Show Custom Toast
    </Button>
  );
}
