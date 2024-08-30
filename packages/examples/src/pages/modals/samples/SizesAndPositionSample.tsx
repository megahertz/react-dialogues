import { Button, Footer, Modal } from 'react-dialogues';

export function SizesAndPositionSample() {
  const children = 'Small test modal content';
  return (
    <>
      <Footer align="left">
        <Button onClick={() => Modal.show({ children, title: 'Normal' })}>
          Normal
        </Button>
        <Button
          onClick={() =>
            Modal.show({ children: <LongText />, title: 'Long Text' })
          }
        >
          Long
        </Button>
      </Footer>
      <Footer align="left">
        <Button
          onClick={() =>
            Modal.show({ children, size: 'large', title: 'Large' })
          }
        >
          Large
        </Button>
        <Button
          onClick={() => {
            Modal.show({
              children: <LongText />,
              size: 'large',
              title: 'Large',
            });
          }}
        >
          Large & Long
        </Button>
      </Footer>
      <Footer align="left">
        <Button
          onClick={() => {
            Modal.show({ children, size: 'full', title: 'Fullscreen' });
          }}
        >
          Fullscreen
        </Button>
        <Button
          onClick={() => {
            Modal.show({
              children: <LongText />,
              size: 'full',
              title: 'Fullscreen',
            });
          }}
        >
          Fullscreen & Long
        </Button>
      </Footer>
      <Footer align="left">
        <Button
          onClick={() => {
            Modal.show({ children, centered: true, title: 'Centered' });
          }}
        >
          Centered
        </Button>
      </Footer>
    </>
  );
}

function LongText() {
  return (
    <>
      {Array.from({ length: 100 }).map((_, id) => (
        // eslint-disable-next-line react/no-array-index-key
        <p key={id}>{navigator.userAgent}</p>
      ))}
    </>
  );
}
