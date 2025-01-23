import { Button, Footer, Modal } from 'react-dialogues';

export function ModalSizesAndPositionSample() {
  const content = 'Small test modal content';
  return (
    <>
      <Footer align="left">
        <Button
          onClick={() => {
            Modal.show({ content, title: 'Normal' });
          }}
        >
          Normal
        </Button>
        <Button
          onClick={() => {
            Modal.show(<LongText />, { title: 'Long Text' });
          }}
        >
          Long
        </Button>
      </Footer>
      <Footer align="left">
        <Button
          onClick={() => {
            Modal.show({ content, size: 'large', title: 'Large' });
          }}
        >
          Large
        </Button>
        <Button
          onClick={() => {
            Modal.show({
              content: <LongText />,
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
            Modal.show({ content, size: 'full', title: 'Fullscreen' });
          }}
        >
          Fullscreen
        </Button>
        <Button
          onClick={() => {
            Modal.show(<LongText />, { size: 'full', title: 'Fullscreen' });
          }}
        >
          Fullscreen & Long
        </Button>
      </Footer>
      <Footer align="left">
        <Button
          onClick={() => {
            Modal.show({ content, centered: true, title: 'Centered' });
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
        <p key={id}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      ))}
    </>
  );
}
