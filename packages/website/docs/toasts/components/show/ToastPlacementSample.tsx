import { Button, Toast } from 'react-dialogues';

type ToastPlacement =
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight'
  | 'top'
  | 'topLeft'
  | 'topRight';

const placements: ToastPlacement[] = [
  'topLeft',
  'top',
  'topRight',
  'bottomLeft',
  'bottom',
  'bottomRight',
];

export function ToastPlacementSample() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '8px',
      }}
    >
      {placements.map((placement) => (
        <Button
          key={placement}
          onClick={() => {
            Toast.show({
              title: placement,
              content: `This toast appears at ${placement}.`,
              placement,
            });
          }}
        >
          {placement}
        </Button>
      ))}
    </div>
  );
}
